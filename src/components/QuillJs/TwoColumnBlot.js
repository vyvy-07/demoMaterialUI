// import Quill from 'quill';

// const Block = Quill.import('blots/block'); // Import the base BlockBlot type

// // Extend BlockBlot to create a custom blot
// class TwoColumnBlot extends Block {
//   static blotName = 'twoColumns'; // Custom blot name
//   static tagName = 'div'; // HTML element for this blot

//   static create() {
//     const node = super.create();
//     node.setAttribute('class', 'two-columns'); // Add custom class
//     node.innerHTML = `
//       <div class="column column-left"></div>
//       <div class="column column-right"></div>
//     `;
//     return node;
//   }

//   static formats(node) {
//     return node.getAttribute('class'); // Return the class attribute as format
//   }
// }

// // Register the blot with Quill
// Quill.register(TwoColumnBlot);

// export default TwoColumnBlot;
