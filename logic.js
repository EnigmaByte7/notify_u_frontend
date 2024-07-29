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

function show(message, type) {
    var successElement = document.getElementById('success');
    var warningElement = document.getElementById('warning');
    if(type === 'warn'){    
        warningElement.innerText = message;
        warningElement.style.display = 'flex';
        warningElement.style.opacity = 1;

        setTimeout(function() {
            warningElement.style.display = 'none';
            warningElement.style.opacity = 0;

        }, 5000);
    }
    else{
        successElement.innerText = message;
        successElement.style.display = 'flex';
        successElement.style.opacity = 1;

        setTimeout(function() {
            successElement.style.display = 'none';
            successElement.style.opacity = 0;

        }, 5000);
    }
}

async function Submit() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const checked = document.getElementById('check').value;
    if(contact.length != 10){
        show('Invalid Contact Number!','warn')
    }
    if(checked != 1){
        show('Please accept the terms and conditions to continue','warn');
    }
    try{
        const response = await fetch('https://notifyu-server.onrender.com/register',{
            method : 'POST',
            headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({name : name, contact : contact}),
        });
        const data = await response.json();
        if(response.ok){
            console.log('Regsitered !');
            show(data.message,'success');
        }
        show(data.message,'warn');
    }
    catch(err){
        console.log(err);
    }
}