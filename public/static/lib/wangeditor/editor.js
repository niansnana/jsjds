// 创建富文本
var editor = new wangEditor('content');
// 图片上传
editor.config.uploadImgUrl = '/admin/editor/upload';
// header token
editor.config.uploadHeaders = {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
};
editor.create();
