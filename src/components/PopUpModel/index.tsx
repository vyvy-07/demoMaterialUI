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
      const selection = editor.model.document.selection;
      const position = selection.getFirstPosition();

      // Kiểm tra xem con trỏ chuột có đang trong phần tử p hay không
      const targetP = position?.findAncestor('div.bordered-cell'); // Tìm p có class "bordered-cell"

      editor.model.change((writer: any) => {
        if (targetP) {
          // Nếu con trỏ đang trong p, thay thế nội dung p bằng ảnh
          const imageElement = writer.createElement('imageBlock', {
            src: imageSrc,
            alt: 'Uploaded Image',
          });
          // Tạo caption cho ảnh
          const captionElement = writer.createElement('caption', {
            contenteditable: 'true',
          });
          writer.insertText('Your Caption Here', captionElement);
          // Chèn ảnh vào vị trí con trỏ trong p
          // writer.remove(targetP); // Xóa nội dung hiện tại của p
          writer.append(imageElement, targetP.getParent()); // Thêm ảnh vào phần tử cha của p (div)
        } else {
          // Nếu không trong p, chèn ảnh vào vị trí con trỏ hiện tại
          const imageElement = writer.createElement('imageBlock', {
            src: imageSrc,
          });
          writer.insert(imageElement, position); // Chèn vào vị trí con trỏ
        }
      });
    }
    setIsOpen(false);
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
