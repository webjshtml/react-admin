import React, { Component } from "react";
// antd
import { Upload, message } from "antd";
// icon
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// api
import { UploadToken } from "@/api/common";
class UploadComponent extends Component {
    constructor(props){
        super();
        this.state = {
            imageUrl: "",
            loading: false,
            name: props.name,
            uploadKey: {
                token: "",
                key: ""
            }
        }
    }  

    /**
     * 空间：每个人都可以注册空间，但是如何去识别空间是自己的
     * 密钥：相当于钥匙，通过钥匙以及空间名称去生成token ，token类型暗号之类的东西，也就是一个令牌；
     * token：校验是否有权限上传文件。
     */

    componentDidMount(){}

    static getDerivedStateFromProps(nextProps, prevState){  // 1、静态的，无法获取 this.state，2、必须有返回
        let { value } = nextProps;
        if(!value) { return false; }
        if(value !== prevState.value) {
            return { // 父组件的数组更新到 this.state
                imageUrl: value
            }
        }
        // 直接放在最后面
        return null;
    }

    // 卸载
    componentWillUnmount(){
        localStorage.removeItem("uploadTokey");  // 时效性
    }

    /**
     * 在公司时，并不是这样传参数。
     */
    getUploadToken = () => {
        return UploadToken({
            ak: "dfawTwXxmuWJywb6LFiAn1a_xU8qz58dl3v7Bp74",
            sk: "gynIo9E-zyKeKBrPqeWmmgeA4DQSsl8gpuyYl9dT",
            buckety: "bigbigtime"
        }).then(response => {
            const data = response.data.data;
            localStorage.setItem("uploadTokey", data.token);
            return data.token;
        })
    }

    // 图片传base64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // 上传之前
    beforeUpload = async (file) => {
        // 第一种方式
        const uploadTokey = localStorage.getItem("uploadTokey");
        // if(!this.props.request && !uploadTokey) { return false; }
        // 第二种方式
        const token = uploadTokey || await this.getUploadToken();   // 等待某些行为执行完成，表面性的理解
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        // 解析文件
        const name = file.name;
        const key = encodeURI(`${name}`);
        // 更新文件的 key
        this.setState({
            uploadKey: {
                token,
                key
            }
        })
        return isJpgOrPng && isLt2M;
    }

    // 选择图片时
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const fileInfo = info.file.response;
            const imageUrl = `http://qkronr45u.hn-bkt.clouddn.com/${fileInfo.key}`;

            this.setState({
                imageUrl,
                loading: false,
            }, () => {
                this.triggerChange(this.state.imageUrl);
            })

        }
    };

    // 返回数据
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(changedValue);
        }
    };

    render(){
        const { imageUrl, loading } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                data={this.state.uploadKey}
                action="https://up-z2.qiniup.com"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        )
    }
}
// // 校验数据类型
// UploadComponent.propTypes = {
//     request: PropTypes.bool
// }
// // 默认
// UploadComponent.defaultProps = {
//     request: false
// }
export default UploadComponent;