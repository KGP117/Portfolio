import TitleHeader from '../components/TitleHeader'

const Contact = () => {
    
    return (
        
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                
                <TitleHeader
                    title="Get In Touch With Me"
                    sub= "📧 Contact Information"
                />

                <div className="mt-16">
                    <p className="text-center">
                        If you have any questions or just want to say hi, feel free to reach out!
                    </p>
                    <p className="text-center mt-4">
                        Email: kushrajpollard@gmail.com
                    </p>
                </div>

            </div>
            
        </section>
    )
}

export default Contact