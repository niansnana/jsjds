/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.image_previewText=' '; // 情况上传图片预览的文字

    config.filebrowserImageUploadUrl = '/admin/uploader/webuploader';
    config.filebrowserUploadMethod = 'form';
};