import { DATA } from '@/constant/DataImg';
import { useModel } from '../ModelContext';

const PopUpModel = ({ editor }: { editor: any }) => {
  // const [imageSrc, setImageSrc] = useState('');
  const { isOpen, setIsOpen, imageSrc, setImageSrc } = useModel();
  const chooseImage = (src: string) => {
    setImageSrc(src);
  };
  console.log('imageSrc :>> ', imageSrc);

  const closePopUp = () => {
    if (imageSrc && editor) {
      editor.model.change((writer: any) => {
        // Kiểm tra xem caption đã được đăng ký chưa
        if (!editor.model.schema.isRegistered('caption')) {
          editor.model.schema.register('caption', {
            isLimit: true,
            allowIn: 'imageBlock', // Cho phép caption bên trong imageBlock
            allowContentOf: '$block', // Caption có thể chứa văn bản
          });
        }

        // Mở rộng schema cho imageBlock để cho phép các thuộc tính như src và alt
        editor.model.schema.extend('imageBlock', {
          allowAttributes: ['alt', 'src'], // Các thuộc tính của imageBlock
        });

        const selection = editor.model.document.selection;
        const position = selection.getFirstPosition();

        // Tạo phần tử imageBlock với src và alt
        const imageElement = writer.createElement('imageBlock', {
          src: imageSrc, // URL ảnh
          alt: 'Uploaded Image', // Thuộc tính alt của ảnh
        });
        writer.insert(imageElement, position);

        editor.conversion.for('downcast').elementToElement({
          model: 'caption',
          view: (modelElement: any, { writer }: { writer: any }) => {
            // Lấy text của caption từ model
            const captionText =
              modelElement.childCount > 0
                ? modelElement.getChild(0).data
                : 'Enter image caption here';

            // Tạo phần tử model cho figcaption
            const figcaptionElement = writer.createElement('caption');

            // Tạo một văn bản trong model
            const textNode = writer.createText(captionText);

            // Chèn văn bản vào phần tử caption
            writer.append(textNode, figcaptionElement);

            // Chuyển thành phần tử DOM trong quá trình downcast
            return writer.createEditableElement('figcaption', {
              class: 'ck-editor__editable ck-editor__nested-editable',
              'data-placeholder': 'Enter image caption', // Đặt placeholder
              role: 'textbox', // Đảm bảo vai trò của phần tử là textbox
              tabindex: '-1', // Đảm bảo tab không đi qua nó, có thể thay đổi tùy theo yêu cầu
              'aria-label': `Caption for image: ${captionText}`, // Đặt aria-label cho phần tử
              contenteditable: 'true', // Đảm bảo phần tử có thể chỉnh sửa
            });
          },
        });
      });
    }

    setIsOpen(false); // Đóng pop-up sau khi hoàn thành
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
              className="w-[30px] h-[30px] cursor-pointer "
              onClick={closePopUp}
            >
              chèn
              <img
                className="w-full h-full object-cover"
                src="../img.svg"
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
