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
  Command,
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
  toWidget,
  toWidgetEditable,
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
  GridIcon1x1,
  IconUploadMedia,
} from '@/constant/iconCkeditor';
import React from 'react';
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
class CreateDiv extends Plugin {
  static get requires() {
    // ADDED
    return [Widget];
  }
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('createDiv', () => {
      const button = new ButtonView();
      const ckeditor: any = document?.querySelector('.ck-content ');
      const text = document?.querySelectorAll('p');
      button.set({
        label: 'createDiv',
        icon: FullScreenIcon,
      });
      button.on('execute', () => {
        console.log('text :>> ', text);
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

    // Step 1: Define schema for the grid6x6 container
    editor.model.schema.register('grid6x6', {
      isObject: true,
      allowWhere: '$block', // Can be used where block elements are allowed
    });

    editor.model.schema.register('borderedCell', {
      allowIn: 'grid6x6',
      isBlock: true, // Đảm bảo nó là block element
      allowContentOf: '$block', // Allow block content inside borderedCell
      allowAttributes: ['src', 'alt', 'controls'], // Allow media attributes
    });
    const widgetTypeAroundPlugin = editor.plugins.get('WidgetTypeAround');

    widgetTypeAroundPlugin.clearForceDisabled('grid6x6');

    // Step 2: Define upcast converter (HTML to Model)
    editor.conversion.for('upcast').elementToElement({
      model: 'grid6x6',
      view: {
        name: 'div',
        classes: 'grid6x6',
        styles: `display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  border: 1px dashed #ccc;
  min-height: 60px;`,
      },
    });
    editor.model.change((writer) => {
      // Create an image element
      const imageElement = writer.createElement('imageBlock', {
        src: 'path/to/image.jpg',
        alt: 'Description',
      });
      // if (imageSrc && editor) {
      editor.model.change((writer: any) => {
        const imageElement = writer.createElement('imageBlock', {
          src: 'path/to/image.jpg',
          alt: 'Description',
        });
        editor.model.insertContent(
          imageElement,
          editor.model.document.selection
        );
      });
      // }
      const borderedCell = writer.createElement('img');

      writer.append(imageElement, borderedCell);

      editor.model.insertContent(borderedCell, editor.model.document.selection);
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'borderedCell',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    // Step 3: Define downcast converter (Model to HTML)
    editor.conversion.for('downcast').elementToElement({
      model: 'grid6x6',
      view: (modelElement, { writer }) => {
        const gridDiv = writer.createContainerElement('div', {
          class: '',
          style:
            'display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; border: 1px dashed #ccc; min-height: 60px;',
        });
        return gridDiv;
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'borderedCell',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Step 4: Add the button to the toolbar
    editor.ui.componentFactory.add('grid6x6', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Grid 6x6',
        icon: GridIcon1x1,
        tooltip: true,
      });

      // Insert the grid on button click
      button.on('execute', () => {
        editor.model.change((writer) => {
          // Create grid6x6 element
          const gridElement = writer.createElement('grid6x6');

          // Create two borderedCell elements as children of grid6x6
          const cell1 = writer.createElement('borderedCell');
          const cell2 = writer.createElement('borderedCell');

          writer.append(cell1, gridElement);
          writer.append(cell2, gridElement);

          // Insert grid6x6 element into the editor at the current selection
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
class Grid9x3 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Step 1: Define schema for grid9x3 and cell9x3
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

    // Step 2: Define upcast converter (HTML to Model)
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

    // Step 3: Define downcast converter (Model to HTML)
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

    // Step 4: Add grid9x3 button to toolbar
    editor.ui.componentFactory.add('grid9x3', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 9x3',
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

class UploadMedia extends Plugin {
  static get requires() {
    return [Widget]; // Khai báo Widget nếu cần thiết
  }

  init() {
    const editor = this.editor;

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

  // Hàm chèn ảnh vào vị trí con trỏ hiện tại
  insertImageAtCursor(imageUrl: string) {
    const editor = this.editor;

    // Lấy vị trí con trỏ hiện tại
    const selection = editor.model.document.selection;

    // Đảm bảo có một vị trí selection hợp lệ
    if (selection.rangeCount > 0) {
      // Tạo phần tử ảnh mới
      const imageElement = editor.model.change((writer) => {
        return writer.createElement('imageBlock', {
          src: imageUrl,
          alt: 'Uploaded Image',
        });
      });

      // Chèn phần tử hình ảnh vào vị trí hiện tại của con trỏ
      editor.model.insertContent(imageElement, selection);
    }
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
                CreateDiv,
                UploadMedia,
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
                  'uploadMedia',
                  'grid',

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
                    // icon: GridIcon,
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
                styles: {},
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
                insert: {
                  integrations: ['upload', 'assetManager', 'url'],
                },
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
