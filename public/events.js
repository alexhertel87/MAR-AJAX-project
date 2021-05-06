window.addEventListener("DOMContentLoaded", (event) => {
   let upVote = document.getElementById("upvote")
   let downVote = document.getElementById("downvote")
   let score = document.querySelector(".score")
   let scoreContainer = document.querySelector(".score-container")
   let loading = document.querySelector(".loader");
   let newPic = document.getElementById('new-pic')




   const getCat = async () => {
      const res = await fetch('/kitten/image');
      const json = await res.json()

      if (res.ok) {
         let catPic = document.querySelector('.cat-pic');
         catPic.setAttribute('src', json.src)
         loading.innerHTML = ''
      }
      else{
         alert("Something went wrong! Please try again!")
      }
   }
   getCat()


   const newCat = async () => {
      newPic.addEventListener('click', (event) => {
         loading.innerHTML = 'Loading...'
         getCat()
      })
   }
   newCat()

   scoreContainer.addEventListener("click", async (event) => {
      if(event.target.id === "upvote" || event.target.id === "downvote"){
         const res = await fetch(`/kitten/${event.target.id}`, {method: "PATCH"})
         const json = await res.json()

         if(res.ok){
            score.innerHTML = json.score
         }
         else{
            alert("Broken Button")
         }
      }
   })








})
