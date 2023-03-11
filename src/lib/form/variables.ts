// window.getSelection() > selection.getRangeAt(0) > range.startOffset is used for inserting tags at a users 
// current cursor locaation and it's value is incorrect if a contenteditable div is completely empty
// so this div will ensure it's never completely empty. We remove this div from the content string serverside
export const BASE_CONTENT_EDITABLE_ELEMENT = '<div id="stl--delete-me"></div>'

export const EDITABLE_PRISTINE_ATTRIBUTE = 'pristine-inner-text'
