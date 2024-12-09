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
  Quotes,
  QuotesWithIconSVG,
} from '@/constant/iconCkeditor';
import './style.css';
interface EditorConfig {
  boxQuotes?: { type: string }[]; // Mở rộng thêm thuộc tính boxQuotes
}
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
      allowIn: [
        'imageBlock',
        'grid9x3',
        'grid6x6',
        'grid3x6x3',
        'grid2x8x2',
        'grid3x9',
        'grid4x8',
        'grid8x4',
      ],
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
class Grid3x9 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho grid3x9 và cell3x9
    editor.model.schema.register('grid3x9', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell3x9', {
      allowIn: 'grid3x9',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell3x9', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Upcast và downcast cho grid3x9 và cell3x9
    editor.conversion.for('upcast').elementToElement({
      model: 'grid3x9',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 3fr 9fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell3x9',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid3x9',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 3fr 9fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell3x9',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút grid3x9 vào toolbar
    editor.ui.componentFactory.add('grid3x9', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 3x9',
        icon: GridIcon3x9, // Thay biểu tượng nếu cần
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid3x9');
          for (let i = 0; i < 2; i++) {
            // Tạo 2 ô cho lưới 3x9
            const cell = writer.createElement('cell3x9');
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
class Grid3x6x3 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho Grid3x6x3 và Cell3x6x3
    editor.model.schema.register('grid3x6x3', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell3x6x3', {
      allowIn: 'grid3x6x3',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell3x6x3', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Upcast và downcast cho Grid3x6x3 và Cell3x6x3
    editor.conversion.for('upcast').elementToElement({
      model: 'grid3x6x3',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 3fr 6fr 3fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell3x6x3',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid3x6x3',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 3fr 6fr 3fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell3x6x3',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút Grid3x6x3 vào toolbar
    editor.ui.componentFactory.add('grid3x6x3', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 3x6x3',
        icon: GridIcon3x6x3,
        withText: false,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid3x6x3');
          // Thêm 3 cell tương ứng với cấu hình 3x6x3
          for (let i = 0; i < 3; i++) {
            const cell = writer.createElement('cell3x6x3');
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
class Grid2x8x2 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho Grid2x8x2 và Cell2x8x2
    editor.model.schema.register('grid2x8x2', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell2x8x2', {
      allowIn: 'grid2x8x2',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell2x8x2', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Upcast và downcast cho Grid2x8x2 và Cell2x8x2
    editor.conversion.for('upcast').elementToElement({
      model: 'grid2x8x2',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 2fr 8fr 2fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell2x8x2',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid2x8x2',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 2fr 8fr 2fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell2x8x2',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút Grid2x8x2 vào toolbar
    editor.ui.componentFactory.add('grid2x8x2', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 2x8x2',
        icon: GridIcon2x8x2,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid2x8x2');
          // Thêm 3 cell tương ứng với cấu hình 2x8x2
          for (let i = 0; i < 3; i++) {
            const cell = writer.createElement('cell2x8x2');
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
class Grid8x4 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho grid8x4 và cell8x4
    editor.model.schema.register('grid8x4', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell8x4', {
      allowIn: 'grid8x4',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell8x4', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Upcast và downcast cho grid8x4 và cell8x4
    editor.conversion.for('upcast').elementToElement({
      model: 'grid8x4',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 8fr 4fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell8x4',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid8x4',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 8fr 4fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell8x4',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút grid8x4 vào toolbar
    editor.ui.componentFactory.add('grid8x4', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 8x4',
        icon: GridIcon8x4,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid8x4');
          for (let i = 0; i < 2; i++) {
            // Chỉ tạo 2 ô cho 2 cột
            const cell = writer.createElement('cell8x4');
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
class Grid4x8 extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    // Đăng ký schema cho grid4x8 và cell4x8
    editor.model.schema.register('grid4x8', {
      isObject: true,
      allowWhere: '$block',
    });

    editor.model.schema.register('cell4x8', {
      allowIn: 'grid4x8',
      isBlock: true,
      allowContentOf: '$block',
      allowAttributes: ['src', 'alt'],
    });

    editor.model.schema.extend('cell4x8', {
      allowContentOf: '$root', // Cho phép các phần tử cấp block bên trong
    });

    // Upcast và downcast cho grid4x8 và cell4x8
    editor.conversion.for('upcast').elementToElement({
      model: 'grid4x8',
      view: {
        name: 'div',
        styles:
          'display: grid; grid-template-columns: 4fr 8fr; grid-template-rows: 1fr; gap: 4px; border: 1px dashed #ccc;',
      },
    });

    editor.conversion.for('upcast').elementToElement({
      model: 'cell4x8',
      view: {
        name: 'div',
        classes: 'bordered-cell',
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'grid4x8',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', {
          style:
            'display: grid; grid-template-columns: 4fr 8fr; grid-template-rows: 1fr; gap: 4px; border: 1px dashed #ccc;',
        });
      },
    });

    editor.conversion.for('downcast').elementToElement({
      model: 'cell4x8',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('div', { class: 'bordered-cell' });
      },
    });

    // Thêm nút grid4x8 vào toolbar
    editor.ui.componentFactory.add('grid4x8', (locale) => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Insert Grid 4x8',
        icon: GridIcon4x8,
        tooltip: true,
      });

      button.on('execute', () => {
        editor.model.change((writer) => {
          const gridElement = writer.createElement('grid4x8');
          // Chỉ tạo 2 ô
          for (let i = 0; i < 2; i++) {
            const cell = writer.createElement('cell4x8');
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

class BlockQuoteBorder extends Plugin {
  init() {
    const editor: any = this.editor;

    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertQuoteLinesCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    editor.model.schema.register('customQuoteLines', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('downcast').elementToElement({
      model: 'customQuoteLines',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'quote-lines',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'quote-lines',
      },
      model: 'customQuoteLines',
    });
  }

  private addInsertQuoteLinesCommand() {
    const editor: any = this.editor;

    editor.commands.add(
      'insertQuoteLines',
      new InsertQuoteLinesCommand(editor)
    );
    editor.ui.componentFactory.add('insertQuoteLines', (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: 'insertQuoteLines',
        icon: LineParallel,
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute('insertQuoteLines'));

      return buttonView;
    });
  }
}

class InsertQuoteLinesCommand extends Command {
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
    const quote = writer.createElement('customQuoteLines');
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);

    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}

class BlockHorizontal extends Plugin {
  init() {
    const editor: any = this.editor;

    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    editor.model.schema.register('customBlockQuote', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('downcast').elementToElement({
      model: 'customBlockQuote',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'custom-quote-button',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'custom-quote-button',
      },
      model: 'customBlockQuote',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    editor.commands.add('insertCustomBlock', new InsertBlockHorizontal(editor));
    editor.ui.componentFactory.add('insertCustomBlock', (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: 'Insert Custom Block',
        icon: LineHorizontal,
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute('insertCustomBlock'));

      return buttonView;
    });
  }
}

class InsertBlockHorizontal extends Command {
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
    const quote = writer.createElement('customBlockQuote');
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);

    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}
class QuotesWithIcon extends Plugin {
  init() {
    const editor: any = this.editor;

    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    editor.model.schema.register('quotesWithIcon', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('downcast').elementToElement({
      model: 'quotesWithIcon',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'quotes-with-icon-button',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'quotes-with-icon-button',
      },
      model: 'quotesWithIcon',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    editor.commands.add(
      'insertQuotesWithIcon',
      new InsertQuotesWithIcon(editor)
    );
    editor.ui.componentFactory.add('insertQuotesWithIcon', (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: 'Insert Quote with Icon',
        icon: QuotesWithIconSVG, // Replace with your icon if needed
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute('insertQuotesWithIcon'));

      return buttonView;
    });
  }
}

class InsertQuotesWithIcon extends Command {
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
    const quote = writer.createElement('quotesWithIcon');
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);

    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}
class BoxQuotesBlue extends Plugin {
  init() {
    const editor: any = this.editor;

    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    editor.model.schema.register('boxQuotesBlue', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('downcast').elementToElement({
      model: 'boxQuotesBlue',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'box-quotes-blue',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'box-quotes-blue',
      },
      model: 'boxQuotesBlue',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    editor.commands.add('insertBoxQuotesBlue', new InsertBoxQuotesBlue(editor));
    editor.ui.componentFactory.add('insertBoxQuotesBlue', (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: 'Box Blue',
        icon: BoxQuotesBlueSVG, // Replace with your icon
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute('insertBoxQuotesBlue'));

      return buttonView;
    });
  }
}

class InsertBoxQuotesBlue extends Command {
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
    const quote = writer.createElement('boxQuotesBlue');
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);

    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}

class BoxQuotesGrey extends Plugin {
  init() {
    const editor: any = this.editor;

    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    editor.model.schema.register('boxQuotesGrey', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('downcast').elementToElement({
      model: 'boxQuotesGrey',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'box-quotes-grey',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'box-quotes-grey',
      },
      model: 'boxQuotesGrey',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    editor.commands.add('insertBoxQuotesGrey', new InsertBoxQuotesGrey(editor));
    editor.ui.componentFactory.add('insertBoxQuotesGrey', (locale: any) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: 'Box Grey',
        icon: BoxQuotesGreySVG, // Replace with your icon
        tooltip: true,
      });

      buttonView.on('execute', () => editor.execute('insertBoxQuotesGrey'));

      return buttonView;
    });
  }
}

class InsertBoxQuotesGrey extends Command {
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
    const quote = writer.createElement('boxQuotesGrey');
    const paragraph = writer.createElement('paragraph');
    writer.append(paragraph, quote);

    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    this.isEnabled = true;
  }
}
class BoxQuotesGreen extends Plugin {
  init() {
    const editor: any = this.editor;
    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    // Register a schema for the green box quote
    editor.model.schema.register('boxQuotesGreen', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    // Downcast: Convert the model to a green boxquote in the view
    conversion.for('downcast').elementToElement({
      model: 'boxQuotesGreen',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'box-quotes-green',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    // Upcast: Convert a view blockquote with the 'box-quotes-green' class into a model element
    conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'box-quotes-green',
      },
      model: 'boxQuotesGreen',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    // Add a custom command to insert the green box quote
    editor.commands.add(
      'insertBoxQuotesGreen',
      new InsertBoxQuotesGreen(editor)
    );

    // Add the button to the UI
    editor.ui.componentFactory.add('insertBoxQuotesGreen', (locale: any) => {
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Box Green',
        icon: BoxQuotesGreenSVG, // Replace with your custom icon
        tooltip: true,
      });

      // Execute the insert command when the button is clicked
      buttonView.on('execute', () => editor.execute('insertBoxQuotesGreen'));

      return buttonView;
    });
  }
}

class InsertBoxQuotesGreen extends Command {
  execute() {
    const editor = this.editor;

    // Change the model: remove nested blockquotes and insert the green boxquote
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
    const quote = writer.createElement('boxQuotesGreen');
    const paragraph = writer.createElement('paragraph');

    writer.append(paragraph, quote);
    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    // Enable the command when needed
    this.isEnabled = true;
  }
}
class QuotesFitContent extends Plugin {
  init() {
    const editor: any = this.editor;
    this.registerSchema();
    this.addDowncastConversion();
    this.addUpcastConversion();
    this.addInsertCustomBlockCommand();
  }

  private registerSchema() {
    const editor: any = this.editor;

    // Đăng ký schema cho QuotesFitContent
    editor.model.schema.register('QuotesFitContent', {
      inheritAllFrom: '$block',
      allowContentOf: '$root',
    });
  }

  private addDowncastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    // Downcast: Model -> View với class QuotesFitContent
    conversion.for('downcast').elementToElement({
      model: 'QuotesFitContent',
      view: (modelElement: any, { writer }: { writer: any }) => {
        return writer.createContainerElement('blockquote', {
          class: 'QuotesFitContent',
        });
      },
    });
  }

  private addUpcastConversion() {
    const editor: any = this.editor;
    const conversion = editor.conversion;

    // Upcast: View -> Model với class QuotesFitContent
    conversion.for('upcast').elementToElement({
      view: {
        name: 'blockquote',
        classes: 'QuotesFitContent',
      },
      model: 'QuotesFitContent',
    });
  }

  private addInsertCustomBlockCommand() {
    const editor: any = this.editor;

    // Thêm command chèn block QuotesFitContent
    editor.commands.add(
      'insertQuotesFitContent',
      new InsertQuotesFitContent(editor)
    );

    // Thêm nút vào UI
    editor.ui.componentFactory.add('insertQuotesFitContent', (locale: any) => {
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: 'Box Fit-content',
        icon: BoxQuotesFitContent, // Thay thế bằng icon bạn muốn
        tooltip: true,
      });

      // Khi nhấn nút, thực hiện command
      buttonView.on('execute', () => editor.execute('insertQuotesFitContent'));

      return buttonView;
    });
  }
}

class InsertQuotesFitContent extends Command {
  execute() {
    const editor = this.editor;

    // Thay đổi model: Xóa các blockquotes lồng nhau và chèn block mới
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
    const quote = writer.createElement('QuotesFitContent');
    const paragraph = writer.createElement('paragraph');

    writer.append(paragraph, quote);
    editor.model.insertContent(quote);
    writer.setSelection(paragraph, 'in');
  }

  refresh() {
    // Bật command khi cần thiết
    this.isEnabled = true;
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
