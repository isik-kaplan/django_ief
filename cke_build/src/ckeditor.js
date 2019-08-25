import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import {makeSaveData, makeImageUploadAdapterPlugin, getCSRFCookie} from './utilities'

export default class InlineEditor extends InlineEditorBase {
}

// Plugins to include in the build.
InlineEditor.builtinPlugins = [
    Essentials,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    CKFinder,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    Autosave,
    Font,
    Alignment,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
];

let allColors = [
    'f9ebea', 'f2d7d5', 'e6b0aa', 'd98880', 'cd6155', 'c0392b', 'a93226', '922b21', '7b241c', '641e16',
    'fdedec', 'fadbd8', 'f5b7b1', 'f1948a', 'ec7063', 'e74c3c', 'cb4335', 'b03a2e', '943126', '78281f',
    'f5eef8', 'ebdef0', 'd7bde2', 'c39bd3', 'af7ac5', '9b59b6', '884ea0', '76448a', '633974', '512e5f',
    'f4ecf7', 'e8daef', 'd2b4de', 'bb8fce', 'a569bd', '8e44ad', '7d3c98', '6c3483', '5b2c6f', '4a235a',
    'eaf2f8', 'd4e6f1', 'a9cce3', '7fb3d5', '5499c7', '2980b9', '2471a3', '1f618d', '1a5276', '154360',
    'ebf5fb', 'd6eaf8', 'aed6f1', '85c1e9', '5dade2', '3498db', '2e86c1', '2874a6', '21618c', '1b4f72',
    'e8f8f5', 'd1f2eb', 'a3e4d7', '76d7c4', '48c9b0', '1abc9c', '17a589', '148f77', '117864', '0e6251',
    'e8f6f3', 'd0ece7', 'a2d9ce', '73c6b6', '45b39d', '16a085', '138d75', '117a65', '0e6655', '0b5345',
    'e9f7ef', 'd4efdf', 'a9dfbf', '7dcea0', '52be80', '27ae60', '229954', '1e8449', '196f3d', '145a32',
    'eafaf1', 'd5f5e3', 'abebc6', '82e0aa', '58d68d', '2ecc71', '28b463', '239b56', '1d8348', '186a3b',
    'fef9e7', 'fcf3cf', 'f9e79f', 'f7dc6f', 'f4d03f', 'f1c40f', 'd4ac0d', 'b7950b', '9a7d0a', '7d6608',
    'fef5e7', 'fdebd0', 'fad7a0', 'f8c471', 'f5b041', 'f39c12', 'd68910', 'b9770e', '9c640c', '7e5109',
    'fdf2e9', 'fae5d3', 'f5cba7', 'f0b27a', 'eb984e', 'e67e22', 'ca6f1e', 'af601a', '935116', '784212',
    'fbeee6', 'f6ddcc', 'edbb99', 'e59866', 'dc7633', 'd35400', 'ba4a00', 'a04000', '873600', '6e2c00',
    'fdfefe', 'fbfcfc', 'f7f9f9', 'f4f6f7', 'f0f3f4', 'ecf0f1', 'd0d3d4', 'b3b6b7', '979a9a', '7b7d7d',
    'f8f9f9', 'f2f3f4', 'e5e7e9', 'd7dbdd', 'cacfd2', 'bdc3c7', 'a6acaf', '909497', '797d7f', '626567',
    'f4f6f6', 'eaeded', 'd5dbdb', 'bfc9ca', 'aab7b8', '95a5a6', '839192', '717d7e', '5f6a6a', '4d5656',
    'f2f4f4', 'e5e8e8', 'ccd1d1', 'b2babb', '99a3a4', '7f8c8d', '707b7c', '616a6b', '515a5a', '424949',
    'ebedef', 'd6dbdf', 'aeb6bf', '85929e', '5d6d7e', '34495e', '2e4053', '283747', '212f3c', '1b2631',
    'eaecee', 'd5d8dc', 'abb2b9', '808b96', '566573', '2c3e50', '273746', '212f3d', '1c2833', '17202a',
];

// Editor configuration.
InlineEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'alignment',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'blockQuote',
            'mediaEmbed',
        ]
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight'
        ],

        styles: [
            'full',
            'alignLeft',
            'alignRight',
        ]
    },
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace',
        ]
    },
    fontSize: {
        options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21,
            23,
            25,
            27,
            29,
            31,
            33,
            35,
            39,
            43,
            49
        ]
    },
    fontColor: {
        colors: allColors.map(function (color) {
            return {'color': '#' + color}
        }),
        columns: 10,
    },
    fontBackgroundColor: {
        colors: allColors.map(function (color) {
            return {'color': '#' + color}
        }),
        columns: 10,
    },
    alignment: {
        options: ['left', 'right', 'center', 'justify']
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
    autosave: {
        save(editor) {
            return editor.saveData(editor.getData());
        }
    },
};
InlineEditor.makeSaveData = makeSaveData;
InlineEditor.makeImageUploadAdapterPlugin = makeImageUploadAdapterPlugin;
InlineEditor.getCSRFCookie = getCSRFCookie;