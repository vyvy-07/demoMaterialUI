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
        // Kiểm tra xem caption đã được đăng ký chưa
        if (!editor.model.schema.isRegistered('caption')) {
          editor.model.schema.register('caption', {
            allowIn: ['imageBlock', 'grid9x3', 'grid6x6'],
            allowContentOf: '$block', // Caption có thể chứa văn bản
          });
        }

        // Mở rộng schema cho imageBlock để cho phép các thuộc tính như src và alt
        editor.model.schema.extend('imageBlock', {
          allowAttributes: ['alt', 'src'], // Các thuộc tính của imageBlock
        });

        const selection = editor.model.document.selection;
        const position = selection.getFirstPosition();

        // Kiểm tra xem con trỏ có đang ở trong thẻ <p> không
        const parentElement = position.parent;
        if (parentElement.is('element', 'paragraph')) {
          // Nếu con trỏ đang ở trong thẻ <p>, xóa thẻ này
          writer.remove(parentElement);
        }

        // Kiểm tra lại position có hợp lệ không
        const newPosition = editor.model.document.selection.getFirstPosition();

        // Tạo phần tử imageBlock với src và alt
        const imageElement = writer.createElement('imageBlock', {
          src: imageSrc, // URL ảnh
          alt: 'Ảnh đã tải lên', // Thuộc tính alt của ảnh
        });

        // Chèn hình ảnh vào vị trí hợp lệ
        writer.insert(imageElement, newPosition); // Chèn hình ảnh vào vị trí hiện tại

        // Đăng ký và xử lý caption cho ảnh
        editor.conversion.for('downcast').elementToElement({
          model: 'caption',
          view: (modelElement: any, { writer }: { writer: any }) => {
            const captionText =
              modelElement.childCount > 0
                ? modelElement.getChild(0).data
                : 'Nhập caption cho ảnh ở đây';

            const figcaptionElement = writer.createElement('caption');
            const textNode = writer.createText(captionText);
            writer.append(textNode, figcaptionElement);

            return writer.createEditableElement('figcaption', {
              class: 'ck-editor__editable ck-editor__nested-editable',
              'data-placeholder': 'Nhập caption cho ảnh ở đây',
              role: 'textbox',
              tabindex: '-1',
              'aria-label': `Caption cho ảnh: ${captionText}`,
              contenteditable: 'true',
            });
          },
        });
      });

      setIsOpen(false); // Đóng pop-up sau khi hoàn thành
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
