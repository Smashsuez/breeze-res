import React from 'react'

const Location = () => {
  return (
    <div className="bg-white" id='location'>
       <div className="w-[100%] text-center pt-10">
          <span className="font-capriola text-[30px] text-blue-900">Our  <span className='text-green-600'>Location</span></span>
        </div>
        <div className="py-10 px-4 flex flex-wrap gap-6 md:gap-20 justify-evenly flex-col-reverse md:flex-row">
        <div className='border-4 rounded-xl border-blue-900 overflow-hidden w-450px max-w-[90vw] self-center'
        data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d730.6517128481352!2d32.502574440933756!3d29.998078866663825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14562f19ec4a750d%3A0x199c3d73dd480bb1!2sFaculty%20of%20Computers%20and%20Information%20-%20Suez%20University!5e1!3m2!1sar!2seg!4v1699295715580!5m2!1sar!2seg" 
        width="600" 
        height="450" 
        style={{border:"0"}} 
        allowfullscreen="" 
        // loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="text-blue-900 text-[40px] font-capriola "
        data-aos="zoom-in-up">Find us at <br/>the heart of the city</div>
        </div>
    </div>
  )
}

export default Location ;