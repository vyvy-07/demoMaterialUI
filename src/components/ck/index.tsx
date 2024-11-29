// 'use client'; // only in App Router

// components/custom-editor.js
'use client'; // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Alignment,
  Autoformat,
  AutoImage,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ButtonView,
  ClassicEditor,
  CodeBlock,
  createDropdown,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Mention,
  // Model,
  PageBreak,
  Paragraph,
  PictureEditing,
  Plugin,
  RemoveFormat,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableColumnResize,
  TableToolbar,
  TodoList,
  Underline,
  Widget,
  WordCount,
} from 'ckeditor5';

import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import 'ckeditor5/ckeditor5.css';
import { useRef, useState } from 'react';

import { globalOpenPopUp, useModel } from '@/components/ModelContext';
import PopUpModel from '@/components/PopUpModel';
import {
  FullScreenIcon,
  GridIcon,
  GridIcon6x6,
  GridIcon9x3,
  IconUploadMedia,
} from '@/constant/iconCkeditor';
import './style.css';
class ScreenPlugin extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('screen', () => {
      const button = new ButtonView();
      const ckeditor = document?.querySelector('.ckeditor');
      button.set({
        label: 'Fullscreen',
        // withText: true,
        icon: FullScreenIcon,
      });
      button.on('execute', () => {
        ckeditor?.classList.toggle('active');
      });
      return button;
    });
  }
}
class UploadMedia extends Plugin {
  static get requires() {
    return [Widget]; // Khai báo Widget nếu cần thiết
  }

  init() {
    const editor = this.editor;
    // editor.model.schema.register('caption', {
    //   allowIn: 'imageBlock',
    //   allowContentOf: '$block',
    // });

    editor.ui.componentFactory.add('uploadMedia', () => {
      const button = new ButtonView();

      button.set({
        label: 'Upload Media', // Tiêu đề của nút
        icon: IconUploadMedia, // Icon nút
        tooltip: true, // Hiển thị tooltip khi hover
      });

      // Khi người dùng nhấn vào nút
      button.on('execute', () => {
        globalOpenPopUp();
      });

      return button;
    });
  }
}

class Grid9x3 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho grid9x3 và cell9x3
    editor.model.schema.register('grid9x3', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell9x3', {
      allowIn: 'grid9x3',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell9x3', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Đăng ký schema cho caption và đảm bảo nó là widget để có thể chỉnh sửa
    editor.model.schema.register('caption', {
      allowIn: ['imageBlock', 'grid9x3'],
      allowContentOf: '$block',
    });

    // Upcast và downcast cho grid9x3 và cell9x3
    editor.conversion.for('upcast').elementToElement({
      model: 'grid9x3',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 9fr 3fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell9x3',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid9x3',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 9fr 3fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell9x3',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút grid9x3 vào toolbar
    editor.ui.componentFactory.add('grid9x3', (locale: any) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 9x3',
        icon: GridIcon9x3,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid9x3');
          const cell1 = writer.createElement('cell9x3');
          const cell2 = writer.createElement('cell9x3');
          writer.append(cell1, gridElement);
          writer.append(cell2, gridElement);

          editor.model.insertContent(
            gridElement,
            editor.model.document.selection
          );
        });
      });

      return button;
    });
  }
}
class Grid6x6 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho grid6x6 và cell6x6
    editor.model.schema.register('grid6x6', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell6x6', {
      allowIn: 'grid6x6',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell6x6', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // // Đăng ký schema cho caption và đảm bảo nó là widget để có thể chỉnh sửa
    // editor.model.schema.register('caption', {
    //   allowIn: ['imageBlock', 'grid6x6'],
    //   allowContentOf: '$block',
    // });

    // Upcast và downcast cho grid6x6 và cell6x6
    editor.conversion.for('upcast').elementToElement({
      model: 'grid6x6',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 6fr 6fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell6x6',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid6x6',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 6fr 6fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell6x6',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút grid6x6 vào toolbar
    editor.ui.componentFactory.add('grid6x6', (locale: any) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 6x6',
        icon: GridIcon6x6,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid6x6');
          for (let i = 0; i < 2; i++) {
            const cell = writer.createElement('cell6x6');
            writer.append(cell, gridElement);
          }

          editor.model.insertContent(
            gridElement,
            editor.model.document.selection
          );
        });
      });

      return button;
    });
  }
}

function CustomEditor() {
  const editorRef = useRef<any>(null);
  const [word, setWord] = useState(0);
  const [editorData, setEditorData] = useState<string>(
    '<p>Initial content</p>'
  );

  const [characters, setCharacters] = useState(0);
  const { isOpen, openPopUp } = useModel();
  const editorConfig = {
    extraPlugins: [
      (editor: any) => {
        editor.openPopUp = openPopUp; // Add openPopUp to the editor instance
        return new UploadMedia(editor);
      },
    ],
  };

  return (
    <>
      <PopUpModel editor={editorRef.current} />
      <div className="grid grid-cols-2 gap-6">
        <div className="ckeditor overflow-auto">
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [
                UploadMedia,
                // LayoutDropdownPlugin,
                // GridLayoutPlugin,
                Grid9x3,
                Grid6x6,
                Alignment,
                RemoveFormat,
                Autoformat,
                BlockQuote,
                Bold,
                FontFamily,
                FontSize,
                FontColor,
                FontBackgroundColor,
                Essentials,
                Heading,
                //
                Image,
                ImageCaption,
                AutoImage,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                Base64UploadAdapter,
                ImageResizeEditing,
                ImageResizeHandles,
                //
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                MediaEmbed,
                Mention,
                ScreenPlugin,
                Paragraph,
                PictureEditing,
                Table,
                TableColumnResize,
                TableToolbar,
                Underline,
                TodoList,
                Superscript,
                Subscript,
                CodeBlock,
                HorizontalLine,
                PageBreak,
                Highlight,
                FindAndReplace,
                SourceEditing,
                WordCount,
                AutoImage,
                SpecialCharacters,
                SpecialCharactersEssentials,
                Strikethrough,
              ],
              toolbar: {
                items: [
                  'layoutDropdown',
                  'gridLayout',
                  'uploadMedia',
                  'grid',
                  'insertImage',
                  'removeFormat',
                  '|',
                  'undo',
                  'redo',
                  '|',
                  'heading',
                  '|',
                  'fontfamily',
                  'fontsize',
                  'fontColor',
                  'fontBackgroundColor',
                  'todoList',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'blockQuote',
                  'alignment',
                  'strikethrough',
                  '|',
                  'link',
                  'screen',
                  '|',
                  'bulletedList',
                  'numberedList',
                  '|',

                  'mediaEmbed',
                  'insertTable',

                  {
                    label: 'Grid Layout',
                    icon: GridIcon,
                    items: [
                      'grid12',
                      'grid6x6',
                      'grid9x3',
                      'insertGrid',
                      'grid3x3',
                      'grid2x1',
                      'grid4x1',
                    ],
                  },
                  {
                    label: 'Special Characters Math',
                    icon: 'plus',
                    items: ['specialCharacters', 'subscript', 'superscript'],
                  },
                  '|',

                  'findAndReplace',
                  '|',
                  'horizontalLine',
                  'pageBreak',
                  'codeBlock',
                  'sourceEditing',
                  'highlight',
                ],
                shouldNotGroupWhenFull: true,
              },

              image: {
                toolbar: [
                  // 'toggleImageCaption',
                  // 'imageTextAlternative',
                  'ckboxImageEdit',
                  'imageCaption',
                  'autoImage',
                  'imageResize',
                  'imageStyle:block',
                  'imageStyle:inline',
                  'imageStyle:side',
                  'imageStyle:alignLeft',
                  // 'imageStyle:alignRight',
                  // 'imageStyle:alignBlockLeft',
                  // 'imageStyle:alignBlockRight',
                  'imageStyle:alignCenter',

                  '|',
                  'toggleImageCaption',
                  'imageTextAlternative',
                ],
                // insert: {
                //   integrations: ['upload', 'assetManager', 'url'],
                // },
              },
              wordCount: {
                onUpdate: (stats) => {
                  setWord(stats.words);
                  setCharacters(stats.characters);
                },
              },

              codeBlock: {
                languages: [
                  { language: 'css', label: 'CSS' },
                  { language: 'html', label: 'HTML' },
                ],
              },
              heading: {
                options: [
                  {
                    model: 'paragraph',

                    title: 'Paragraph',
                    class: 'ck-heading_paragraph text-[20px]',
                  },
                  {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1 text-[40px]',
                  },
                  {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2',
                  },
                  {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3',
                  },
                  {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4',
                  },
                ],
              },

              link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
              },
              table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
              },
            }}
            data="<div>Hello from the first editor working with the context!</div>
          "
            contextItemMetadata={{
              name: 'editor1',
              yourAdditionalData: 2,
            }}
            // onReady={(editor) => {
            //   console.log('Editor 1 is ready to use!', editor);
            // }}
            // onChange={(event, editor) => {
            //   setEditorData(editor.getData());
            // }}
            onReady={(editor: any) => {
              // Gán CKEditor instance vào editorRef khi CKEditor sẵn sàng
              editorRef.current = editor;
            }}
          />

          <>
            <div className="ck ck-word-count px-4 flex items-center justify-end gap-1">
              <div className="ck-word-count__words">
                {`Kí tự: ` + characters}
              </div>
              <div className="ck-word-count__characters">
                {`Số từ: ` + word}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default CustomEditor;
