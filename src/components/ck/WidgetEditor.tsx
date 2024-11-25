import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ReactDOM from 'react-dom';
import React from 'react';

const MyReactComponent: React.FC = () => {
  return (
    <div
      style={{
        border: '1px solid #007bff',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <h3>My React Widget</h3>
      <p>This is a React component rendered inside CKEditor!</p>
    </div>
  );
};

// export default class ReactWidget extends Plugin {
//   init(): void {
//     const editor = this.editor;

//     // Add the button to the toolbar
//     editor.ui.componentFactory.add('reactWidget', (locale) => {
//       const button = new ButtonView(locale);

//       button.set({
//         label: 'Insert React Widget',
//         tooltip: true,
//       });

//       button.on('execute', () => {
//         editor.model.change((writer) => {
//           const widgetElement = writer.createElement('reactWidget');

//           // Insert the widget into the content
//           editor.model.insertContent(
//             widgetElement,
//             editor.model.document.selection
//           );
//         });
//       });

//       return button;
//     });

//     // Define the schema
//     editor.model.schema.register('reactWidget', {
//       isObject: true,
//       allowWhere: '$block',
//     });

//     // Upcast conversion (view -> model)
//     editor.conversion.for('upcast').elementToElement({
//       model: 'reactWidget',
//       view: {
//         name: 'div',
//         classes: 'react-widget',
//       },
//     });

//     // Data downcast conversion (model -> data view)
//     editor.conversion.for('dataDowncast').elementToElement({
//       model: 'reactWidget',
//       view: {
//         name: 'div',
//         classes: 'react-widget',
//       },
//     });

//     // Editing downcast conversion (model -> editing view)
//     editor.conversion.for('editingDowncast').elementToElement({
//       model: 'reactWidget',
//       view: (modelItem, viewWriter: any) => {
//         const widgetElement = viewWriter.createContainerElement('div', {
//           class: 'react-widget',
//         });

//         // Mount React component
//         setTimeout(() => {
//           const domElement =
//             editor.editing.view.domConverter.mapViewToDom(widgetElement);
//           if (domElement) {
//             ReactDOM.render(<MyReactComponent />, domElement);
//           }
//         });

//         return widgetElement;
//       },
//     });
//   }
// }
export default MyReactComponent;
