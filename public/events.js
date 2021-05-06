window.addEventListener("DOMContentLoaded", (event) => {
   let upVote = document.getElementById("upvote")
   let downVote = document.getElementById("downvote")
   let score = document.querySelector(".score")
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
   }
   getCat()


   const newCat = async () => {
      newPic.addEventListener('click', (event) => {
         loading.innerHTML = 'Loading...'
         getCat()
      })
   }
   newCat()









})
