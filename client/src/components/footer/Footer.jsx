import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
            <div className='container'>
                <div className='top'>
                    <div className='about'>
                        <span className='title'>Về ITviec</span>
                        <span>Trang chủ</span>
                        <span>Dịch vụ gợi ý ứng viên</span>
                        <span>Liên hệ</span>
                    </div>
                    <div className='rule'>
                        <span className='title'>Điều khoản chung</span>
                        <span>Quy định bảo mật</span>
                        <span>Quy chế hoạt động</span>
                        <span>Giải quyết khiếu nại</span>
                    </div>
                    <div className='media'>
                    <span>Copyright © IT VIEC JSC</span>
                    <span><FontAwesomeIcon icon={faFacebook}/></span>


                    </div>
                </div>
                <div className='contact'>
                    <span className='title'>Liên hệ để đăng tin tuyển dụng tại</span>
                    <span>Hà nội: 021036120924</span>
                </div>
            </div>
        </div>
  )
}

export default Footer