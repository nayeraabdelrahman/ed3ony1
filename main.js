let fixedNav = document.querySelector('.header');
window.addEventListener("scroll",()=>{
    window.scrollY > 120 ?fixedNav.classList.add('active') : fixedNav.classList.remove('active');
})
//surah api
let SurahsContainer = document.querySelector('.SurhasContainer');
getSurhas()
function getSurhas(){
//fetch surhas meta data {name of surah}
fetch("http://api.alquran.cloud/v1/meta")
.then(response =>response.json())
.then(data =>{
    let surahs = data.data.surahs.references;
    let numberOfSurahs =114;
    SurahsContainer.innerHTML=""
    for(let i=0;i<numberOfSurahs;i++){
        SurahsContainer.innerHTML +=`
        <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>
        `
    }
    let SurahsTitles = document.querySelectorAll('.surah');
    let popup = document.querySelector('.surah-popup'),
    AyatContainer = document.querySelector('.ayat');
    SurahsTitles.forEach((title,index)=>{
    title.addEventListener('click',()=>{
        fetch(`http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`)
        .then(response =>response.json())
        .then(data =>{
            AyatContainer.innerHTML="";
            let Ayat = data.data.ayahs;
            Ayat.forEach(aya =>{
                popup.classList.add('active');
                AyatContainer.innerHTML +=`
                <p>(${aya.text}  [${aya.numberInSurah}])</p>
                `
            })
        }
        )
    })
    })
    let ClosePropup =document.querySelector('.close-popup')
    ClosePropup.addEventListener('click',()=>{popup.classList.remove('active');})
})
}
// pray time//
let cities=[{arabicName:"مكة المكرمة",name:"Mecca: Geoname ID 104515"},
{arabicName:"المدينة المنورة",name:"Medina: Geoname ID 105072"},
{arabicName:"الرياض",name:"Riyadh: Geoname ID 108410"},
{arabicName:"جدة",name:"Jeddah: Geoname ID 105343"},{arabicName:"القاهرة",name:"EG-C"}]
for (let city of cities){
    const content = `
    <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML +=content
    
}
document.getElementById("cities-select").addEventListener("change",function(){
    document.getElementById("city-name").innerHTML=this.value
    let cityName=""
    for(let city of cities){
        if(city.arabicName==this.value){
            cityName=city.name
        }
    }
    getPrayersTimingsOfCity(cityName)
})
function getPrayersTimingsOfCity(cityName){
    let params={
        country:"SA",
        city: cityName ,
        country:"EG",
        city: cityName
        // "Makkah al Mukarramah"
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity',{
        params:params
    })
    .then(function(response){
        const timings = response.data.data.timings
        document.getElementById("fajr-time").innerHTML=timings.Fajr
        document.getElementById("sunrise-time").innerHTML=timings.Sunrise
        document.getElementById("dhuhr-time").innerHTML=timings.Dhuhr
        document.getElementById("asr-time").innerHTML=timings.Asr
        document.getElementById("sunset-time").innerHTML=timings.Sunset
        document.getElementById("isha-time").innerHTML=timings.Isha
        const readableDate = response.data.data.date.readable
        const weekday= response.data.data.date.hijri.weekday.ar
        const date =weekday+ "   " + "   " +readableDate
        console.log(weekday+ "   " +readableDate)
        document.getElementById("date").innerHTML=date
        
    })
    .catch(function(error){
        console.log(error)
    })
}
getPrayersTimingsOfCity("Mecca: Geoname ID 104515")
// Get all the navbar li elements
const navbarItems = document.querySelectorAll('.header ul li');

// Attach a click event listener to each li element
navbarItems.forEach((item) => {
  item.addEventListener('click', scrollToSection);
});

// Scroll to the section when a navbar item is clicked
function scrollToSection(event) {
  // Get the data-target value
  const targetSection = event.target.getAttribute('data-target');

  // Get the corresponding section element based on the target value
  const section = document.getElementById(targetSection);

  // Scroll to the section using smooth behavior
  section.scrollIntoView({ behavior: 'smooth' });
}
