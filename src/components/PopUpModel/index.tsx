import { DATA } from '@/constant/DataImg';
import { useModel } from '../ModelContext';

const PopUpModel = ({ editor }: { editor: any }) => {
  // const [imageSrc, setImageSrc] = useState('');
  const { isOpen, setIsOpen, imageSrc, setImageSrc } = useModel();
  const chooseImage = (src: string) => {
    setImageSrc(src);
  };
  const closePopUp = () => {
    if (imageSrc && editor) {
      editor.model.change((writer: any) => {
        // Đăng ký schema cho caption nếu chưa đăng ký
        if (!editor.model.schema.isRegistered('caption')) {
          editor.model.schema.register('caption', {
            allowIn: [
              'imageBlock',
              'grid9x3',
              'grid6x6',
              'grid3x6x3',
              'Grid2x8x2',
            ],
            allowContentOf: '$block',
          });
        }

        // Đảm bảo imageBlock cho phép src và alt
        editor.model.schema.extend('imageBlock', {
          allowAttributes: ['alt', 'src'],
        });

        const selection = editor.model.document.selection;
        let position = selection.getFirstPosition();

        // Kiểm tra nếu con trỏ nằm trong thẻ <p>
        const parentElement = position.parent;
        if (parentElement.is('element', 'paragraph')) {
          position = writer.createPositionBefore(parentElement); // Di chuyển con trỏ ra ngoài
          writer.remove(parentElement); // Xóa thẻ <p>
        }

        // Tạo phần tử hình ảnh
        const imageElement = writer.createElement('imageBlock', {
          src: imageSrc,
          alt: 'Ảnh đã tải lên',
        });

        // Chèn ảnh vào vị trí mới
        writer.insert(imageElement, position);

        // Tự động thêm caption nếu cần
        const captionElement = writer.createElement('caption');
        // const textNode = writer.createText('Caption cho ảnh ở đây');
        // writer.append(textNode, captionElement);
        writer.append(captionElement, imageElement); // Gắn caption vào hình ảnh

        // Đảm bảo caption có thể chỉnh sửa
        editor.conversion.for('downcast').elementToElement({
          model: 'caption',
          view: (modelElement: any, { writer }: { writer: any }) => {
            return writer.createEditableElement('figcaption', {
              class: 'ck-editor__editable ck-editor__nested-editable',
              'data-placeholder': 'Caption cho ảnh ở đây',
            });
          },
        });
      });
      // Lắng nghe sự kiện thay đổi để kiểm tra nội dung của caption
      editor.model.document.on('change:data', () => {
        editor.model.change((writer: any) => {
          // Lấy tất cả các thẻ `caption` trong tài liệu
          const captions = Array.from(
            editor.model.document.getRoot().getChildren()
          ).filter((element: any) => element.name === 'caption');

          captions.forEach((caption: any) => {
            // Lấy nội dung văn bản trong `caption`
            const content = Array.from(caption.getChildren())
              .map((child: any) => child.data || '') // Lấy dữ liệu văn bản
              .join('')
              .replace(/[\u00A0\s]/g, ''); // Xóa tất cả khoảng trắng và `&nbsp;`

            // Kiểm tra nếu nội dung hoàn toàn trống
            if (!content) {
              writer.remove(caption); // Xóa thẻ `caption` nếu trống
            }
          });
        });
      });
      setIsOpen(false); // Đóng pop-up
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-[900] top-auto w-fit mr-6 h-full bg-orange-200 overflow-scroll">
          <div className="flex justify-between p-3 border">
            <div>
              <h1 className="text-[24px] ">MEDIA</h1>
            </div>
            <div
              className="w-[90px] bg-slate-300  rounded-sm p-3 flex items-center h-[30px] cursor-pointer "
              onClick={closePopUp}
            >
              chèn
              <img
                className="w-full h-full object-cover"
                src="/close.svg"
                alt=""
              />
            </div>
          </div>
          <div className=" grid grid-cols-4 gap-5  ">
            {DATA?.length > 0 &&
              DATA?.map((item, index) => (
                <div key={index}>
                  <div
                    onClick={() => chooseImage(item?.src)}
                    className={`max-h-[300px] p-1 overflow-hidden ${
                      imageSrc == item?.src && 'border border-black'
                    }`}
                  >
                    <img src={item?.src} alt={item?.alt} />
                  </div>
                  {item?.fileName}
                </div>
              ))}
          </div>
        </div>
      )}{' '}
    </div>
  );
};

export default PopUpModel;
