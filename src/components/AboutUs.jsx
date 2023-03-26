import React from 'react'
import AboutUsImg from '../img/about_us.png';
import LogoImg from '../img/logo.png';


const AboutUs = () => {


  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full' id='home'>
      <div className='py-2 flex-1 flex flex-col items-start justify-center gap-4'>
        <div className='flex items-center gap-2 justify-start p-2'>
          <p></p>
          <div className='w-6 h-6 overflow-hidden'>

          </div>
        </div>
        <p className='md:-mt-[50px] text-[2.5rem] md:text-[3rem] font-bold tracking-wide text-headingColor'>
          About &nbsp;
          <span className='text-red-700 text-[3rem] md:text-[3rem]'>
            US
          </span>
        </p>
        <p className='text-base text-textColor md:text-left md:w-[85%] tracking-wide'>
          Welcome to Bullish Brains, your one-stop-shop for all your financial investment needs. Our mission is to empower our clients with the tools and resources necessary to make informed investment decisions and achieve their financial goals. At Bullish Brains, we understand that the world of finance can be intimidating and overwhelming, especially for first-time investors. That's why we've built a user-friendly and intuitive platform that makes it easy for anyone to invest in stocks, bonds, and mutual funds. Our team of experienced financial advisors and analysts are here to provide you with the guidance and support you need to succeed. Whether you're looking to grow your wealth, save for retirement, or plan for your child's education, we're here to help. We're committed to providing you with the best possible service and experience. That's why we offer competitive pricing, advanced research tools, and a range of investment options to suit your individual needs. Thank you for choosing Bullish Brains. We look forward to helping you achieve your financial goals.

        </p>
      </div>


      <div className='flex relative'>
        <img
          src={AboutUsImg}
          className='md:ml-auto w-auto top-100 lg:w-auto mb-[100px] mt-11'
          alt="about-us" />


      </div>
    </section>
  )
}

export default AboutUs