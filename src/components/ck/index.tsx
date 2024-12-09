// 'use client';
'use client';

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
  BoxQuotesBlueSVG,
  BoxQuotesFitContent,
  BoxQuotesGreenSVG,
  BoxQuotesGreySVG,
  FullScreenIcon,
  GridIcon,
  GridIcon2x8x2,
  GridIcon3x6x3,
  GridIcon3x9,
  GridIcon4x8,
  GridIcon6x6,
  GridIcon8x4,
  GridIcon9x3,
  GroupQuotes,
  IconUploadMedia,
  LineHorizontal,
  LineParallel,
  QuotesWithIconSVG,
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

abstract class GridPlugin extends Plugin {
  // Abstract properties for grid configurations
  abstract gridTemplate: string;
  abstract gridName: string;
  abstract cellName: string;
  abstract cellClass: string;
  abstract icon: string;

  init() {
    const editor = this.editor;

    // Register schema for the grid and cells
    editor.model.schema.register(this.gridName, {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register(this.cellName, {
      allowIn: this.gridName,
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    // Extend schema for cells
    editor.model.schema.extend(this.cellName, {
      allowContentOf: '$root', // Allow block-level elements inside cells
    });

    // Upcast and downcast for the grid and cells
    this.addUpcastDowncastConversions(editor);

    // Add the button to insert the grid
    this.addInsertGridButton(editor);
  }

  private addUpcastDowncastConversions(editor: any) {
    // Upcast for grid and cells
    editor.conversion.for('upcast').elementToElement({
      model: this.gridName,
      view: {
        name: 'div',
        styles: `display: grid; grid-template-columns: ${this.gridTemplate}; gap: 4px; border: 1px dashed #ccc;`,
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: this.cellName,
      view: {
        name: 'div',
        classes: this.cellClass,
      },
    });

    // Downcast for grid and cells
    editor.conversion.for('downcast').elementToElement({
      model: this.gridName,
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('div', {
          style: `display: grid; grid-template-columns: ${this.gridTemplate}; gap: 4px; border: 1px dashed #ccc;`,
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: this.cellName,
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('div', { class: this.cellClass });
      },
    });
  }

  private addInsertGridButton(editor: any) {
    // Add button for grid insertion
    editor.ui.componentFactory.add(this.gridName, (locale: any) => {
      const button = new ButtonView(locale);
      button.set({
        label: `Insert ${this.gridName}`,
        tooltip: true,
        icon: this.icon,
      });

      button.on('execute', () => {
        editor.model.change((writer: any) => {
          const gridElement = writer.createElement(this.gridName);
          // Add cells to the grid
          for (let i = 0; i < 2; i++) {
            const cell = writer.createElement(this.cellName);
            writer.append(cell, gridElement);
          }

          // Insert grid element into the editor
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

// Grid9x3 subclass
class Grid9x3 extends GridPlugin {
  gridTemplate = '9fr 3fr';
  gridName = 'grid9x3';
  cellName = 'cell9x3';
  cellClass = 'bordered-cell';
  icon = GridIcon9x3;
}

// Grid3x9 subclass
class Grid3x9 extends GridPlugin {
  gridTemplate = '3fr 9fr';
  gridName = 'grid3x9';
  cellName = 'cell3x9';
  cellClass = 'bordered-cell';
  icon = GridIcon3x9;
}
class Grid6x6 extends GridPlugin {
  gridTemplate = '6fr 6fr';
  gridName = 'grid6x6';
  cellName = 'cell6x6';
  cellClass = 'bordered-cell';
  icon = GridIcon6x6;
}
class Grid3x6x3 extends GridPlugin {
  gridTemplate = '3fr 6fr 3fr';
  gridName = 'grid3x6x3';
  cellName = 'cell3x6x3';
  cellClass = 'bordered-cell';
  icon = GridIcon3x6x3;
}
class Grid2x8x2 extends GridPlugin {
  gridTemplate = '2fr 8fr 2fr';
  gridName = 'grid2x8x2';
  cellName = 'cell2x8x2';
  cellClass = 'bordered-cell';
  icon = GridIcon2x8x2;
}
class Grid8x4 extends GridPlugin {
  gridTemplate = ' 8fr 4fr';
  gridName = 'grid8x4';
  cellName = 'cell8x4';
  cellClass = 'bordered-cell';
  icon = GridIcon8x4;
}
class Grid4x8 extends GridPlugin {
  gridTemplate = '4fr 8fr ';
  gridName = 'grid4x8';
  cellName = 'cell4x8';
  cellClass = 'bordered-cell';
  icon = GridIcon4x8;
}

abstract class CustomBlockPlugin extends Plugin {
  // Abstract methods that must be implemented by child classes
  abstract blockType: string;
  abstract blockClass: string;
  abstract commandName: string;
  abstract buttonLabel: string;
  abstract buttonIcon: string;

  init() {
    const editor: any = this.editor;
    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;
    editor.model.schema.register(this.blockType, {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    conversion.for('downcast').elementToElement({
      model: this.blockType,
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: this.blockClass,
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: this.blockClass,
      },
      model: this.blockType,
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;
    editor.commands.add(
      this.commandName,
      new InsertCustomBlock(editor, this.blockType)
    );

    editor.ui.componentFactory.add(this.commandName, (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: this.buttonLabel,
        icon: this.buttonIcon,
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute(this.commandName));

      return buttonView;
    });
  }
}

class InsertCustomBlock extends Command {
  blockType: string;

  constructor(editor: any, blockType: string) {
    super(editor);
    this.blockType = blockType;
  }

  execute() {
    const editor = this.editor;
    editor.model.change((writer) => {
      this.removeNestedBlockquotes(writer);
      this.insertCustomQuoteLines(writer, editor);
    });
  }

  private removeNestedBlockquotes(writer: any) {
    const document: any = this.editor.model.document;
    const blocks = Array.from(document.getRoot().getChildren());

    blocks.forEach((block: any) => {
      if (block.is('element', 'blockquote')) {
        const nestedBlockquote: any = Array.from(block.getChildren()).find(
          (child: any) => child.is('element', 'blockquote')
        );

        if (nestedBlockquote) {
          writer.remove(nestedBlockquote);
        }
      }
    });
  }

  private insertCustomQuoteLines(writer: any, editor: any) {
    const quote = writer.createElement(this.blockType);
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);
    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}
class BlockQuoteBorder extends CustomBlockPlugin {
  blockType = 'BlockQuoteBorder';
  blockClass = 'quote-lines';
  commandName = 'insertQuoteLines';
  buttonLabel = 'Quotes border';
  buttonIcon = LineParallel;
}
class BlockHorizontal extends CustomBlockPlugin {
  blockType = 'BlockHorizontal';
  blockClass = 'custom-quote-button';
  commandName = 'insertCustomBlock';
  buttonLabel = 'Quotes Horizontal';
  buttonIcon = LineHorizontal;
}
class QuotesWithIcon extends CustomBlockPlugin {
  blockType = 'QuotesWithIcon';
  blockClass = 'quotes-with-icon-button';
  commandName = 'insertQuotesWithIcon';
  buttonLabel = 'Box Green';
  buttonIcon = QuotesWithIconSVG;
}

class BoxQuotesGreen extends CustomBlockPlugin {
  blockType = 'boxQuotesGreen';
  blockClass = 'box-quotes-green';
  commandName = 'insertBoxQuotesGreen';
  buttonLabel = 'Box Green';
  buttonIcon = BoxQuotesGreenSVG;
}

class QuotesFitContent extends CustomBlockPlugin {
  blockType = 'QuotesFitContent';
  blockClass = 'QuotesFitContent';
  commandName = 'insertQuotesFitContent';
  buttonLabel = 'Box Fit-content';
  buttonIcon = BoxQuotesFitContent;
}
class BoxQuotesGrey extends CustomBlockPlugin {
  blockType = 'BoxQuotesGrey';
  blockClass = 'box-quotes-grey';
  commandName = 'insertBoxQuotesGrey';
  buttonLabel = 'Box Grey';
  buttonIcon = BoxQuotesGreySVG;
}

class BoxQuotesBlue extends CustomBlockPlugin {
  blockType = 'BoxQuotesBlue';
  blockClass = 'box-quotes-blue';
  commandName = 'insertBoxQuotesBlue';
  buttonLabel = 'Box Blue';
  buttonIcon = BoxQuotesBlueSVG;
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
        <div className="ckeditor ">
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [
                QuotesFitContent,
                BoxQuotesBlue,
                BoxQuotesGreen,
                QuotesWithIcon,
                BoxQuotesGrey,
                BlockHorizontal,
                BlockQuoteBorder,
                Grid3x9,
                Grid4x8,
                Grid8x4,
                UploadMedia,
                Grid3x6x3,
                Grid2x8x2,
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
                    label: 'Quotes Group',
                    icon: GroupQuotes,
                    items: [
                      'blockQuote',

                      'insertQuoteLines',
                      'insertCustomBlock',
                      'insertQuotesWithIcon',
                      'insertQuotesFitContent',
                      'InsertBoxQuotesGreen',
                      'insertBoxQuotesBlue',
                      'InsertBoxQuotesGrey',
                    ],
                  },

                  {
                    label: 'Grid Layout',
                    icon: GridIcon,
                    items: [
                      'grid6x6',
                      'grid9x3',
                      'grid3x9',
                      'grid4x4x4',
                      'grid2x8x2',
                      'grid3x6x3',
                      'grid8x4',
                      'grid4x8',
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
                  'ckboxImageEdit',
                  'imageCaption',
                  'autoImage',
                  'imageResize',
                  'imageStyle:block',
                  'imageStyle:inline',
                  'imageStyle:side',
                  'imageStyle:alignLeft',
                  'imageStyle:alignCenter',

                  '|',
                  'toggleImageCaption',
                  'imageTextAlternative',
                ],
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
            data="<p>Hello from the first editor working with the context!</p>"
            contextItemMetadata={{
              name: 'editor1',
              yourAdditionalData: 2,
            }}
            onReady={(editor: any) => {
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
