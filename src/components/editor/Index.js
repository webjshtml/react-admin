import React, { Component } from "react";
// 富文本
import { Editor } from '@tinymce/tinymce-react'
// API
import { Upload } from "@api/common";
class EditorComponent extends Component {
    constructor(props){
        super();
        this.state = {}
    }  

    componentDidMount(){}

    /** 获取富文本内容 */
    handleEditorChange = (value) => {
        this.triggerChange(value);
    }
    
    // 返回数据
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
          onChange({[this.state.name]: changedValue});
        }
    };

    render(){
        const editorObj = {
            height: '800px',
            language: 'zh_CN',
            plugins: 'table lists link image preview code',
            toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
            relative_urls: false,
            file_picker_types: 'image',
            images_upload_url: 'http',
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: (blobInfo, success, failure)=>{
                var formData;
                var file = blobInfo.blob(); //转化为易于理解的file对象
                formData = new FormData();
                formData.append('file', file, file.name);//此处与源文档不一样
                Upload(formData).then(response => {
                    const data = response.data.data.url;
                    success(data);
                }).catch(error => {
                    const data = error.data;
                    failure(data.message);
                })
            }
        }
        return (
            <Editor
                inline={false}
                selector='editorStateRef'  // 选择器
                apiKey='官网上申请的key值'
                initialValue={""}
                init={{...editorObj}}  // 初始化配置
                onEditorChange={this.handleEditorChange}
            />
        )
    }

}
export default EditorComponent;