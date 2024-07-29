gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded',function() {
    gsap.from('.navbar',{
        y:"-100%",
        duration:1,
        delay:0.1,
        ease:"power2.in",
    });
    gsap.to('.github',{
        filter:'drop-shadow(3px 3px 3px black)',
        duration:1,
        delay:1.5,
        ease:"power2.in"
    });
    gsap.from('.heading',{
        filter:"blur(10px)",
        duration:1.5,
        delay:0.1,
        ease:"power2.out"
    })
    gsap.to('.masking1',{
        width:"0%",
        duration:2,
        delay:0.1,
        ease:"power2.out",
        scrollTrigger:{
            trigger:".info",
            start:"top center"
        }
    })
    gsap.to('.masking2',{
        transform:"translate(100%,0)",
        duration:2,
        delay:0.1,
        ease:"power2.out",
        scrollTrigger:{
            trigger:".second",
            start:"top center"
        }
    })
    gsap.to('.container',{
        boxShadow:"8px 8px 12px rgba(0,0,0,0.5)",
        duration:1,
        delay:0.5,
        ease:"power2.in",
        scrollTrigger:{
            trigger:".window"
        }
    })
})

function show(message) {
    var warningElement = document.getElementById('warning');
    warningElement.innerText = message;
    warningElement.style.display = 'flex';
    warningElement.style.opacity = 1;
    
    setTimeout(function() {
        warningElement.style.display = 'none';
        warningElement.style.opacity = 0;

    }, 5000);
}

async function Submit() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    if(contact.size() != 10){
        show('Invalid Contact Number!')
    }
    try{
        const response = await fetch('localhost:5000/register',{
            method : 'POST',
            headers: {
              'Content-type' : 'application/json',
            },
            body: JSON.stringify({name : name, contact : contact}),
        });
        const data = await response.json();
        if(response.ok){
            console.log('Regsitered !');
        }
        show(data.message);
    }
    catch(err){
        console.log(err);
    }
}