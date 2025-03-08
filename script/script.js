let originalPets = [];

function categories(){
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res=> res.json())
    .then(data=> displayCategory(data.categories))
    .catch(error=> console.log(error))
}

const displayCategory=(categories)=>{
const categoryContainer=document.getElementById("categoryContainer")

    categories.forEach((item)=>{
        console.log(item.category);

//create button
const buttonContainer=document.createElement('div');

buttonContainer.innerHTML=
     `
      <button class='btn btn-xl px-10 py-8 flex justify-between rounded-full' 
    onclick="loadCategory('${item.category}')">
     <img class="h-7 w-7" src="${item.category_icon}"/>
     <h1>${item.category}</h1>
 
     </button>
     `
     categoryContainer.append(buttonContainer);
     
  


    })

}


//load all data

function categoryItem(){
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    
    .then(res=>res.json())
    .then(data=> {
        originalPets = data.pets; // Store original order
        displayCard(originalPets)
    });

}

//load category wise data
const loadCategory=(category)=>{
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res=>res.json())
    .then(data=>displayCard(data.data)
       
        


     )
    .catch(error=> console.log(error))
}


const displayCard=(pets)=>{
const petContainer=document.getElementById('card');

petContainer.innerHTML = "";
if(pets.length==0){
    petContainer.classList.remove("grid");
    petContainer.innerHTML=`
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img  src="assets/error.webp"/>
    <h2 class="text-center font-xl font-bold ">No Content in this Category</h2>
    </div>
    `;
    return;
}
else{
    petContainer.classList.add("grid");
}
    pets.forEach((pet)=>{
      //  console.log(pet)
    const cardContainer=document.createElement('div');
    cardContainer.innerHTML=

    `<div class="">
     <figure class="h-[300px] w-full relative">
    <img
      src="${pet.image}"
      class="rounded-xl h-full w-full object-cover" />
  </figure>
  <div class="card-body px-0 ">
    <h2 class="card-title text-xl font-bold">${pet.pet_name}</h2>
    <p class="text-xl text-gray-600">Breed:${pet.breed} </p>
    <p class="text-xl text-gray-600">Birth: ${pet.date_of_birth} </p>
    <p class="text-xl text-gray-600">Gender:${pet.gender}</p>
    <p class="text-xl text-gray-600">Price: ${pet.price}</p>
    <div class="card-actions flex justify-between px-5">
      <button onclick="addToSidebar('${pet.image}')">
    <img src="assets/like.png" class="w-8 h-8"/>
</button>

      <button class="btn btn-lg">Adopt</button>
      <button class="btn btn-lg">Details</button>
    </div>
  </div>
  </div>



    `
petContainer.append(cardContainer)


    }
    
    )

}

function addToSidebar(imageUrl){

    console.log(imageUrl)
    const sidebar = document.getElementById("sidebar");

            // Create a new image element
            const sidebarImg = document.createElement("div");
           
            sidebarImg.innerHTML=
            `
            <img class="w-[250px] relative h-[200px] rounded-xl " src="${imageUrl}"/>
            
            `

            
            sidebar.appendChild(sidebarImg);
        }


 function sortAscending() {
            const sortedPets = [...originalPets].sort((a, b) => a.price - b.price); // Sort a copy
            displayCard(sortedPets); // Display sorted cards
        }
















//call function
categories();
categoryItem();
