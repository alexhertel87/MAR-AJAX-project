window.addEventListener("DOMContentLoaded", (event) => {
   let upVote = document.getElementById("upvote")
   let downVote = document.getElementById("downvote")
   let score = document.querySelector(".score")
   let scoreContainer = document.querySelector(".score-container")
   let loading = document.querySelector(".loader");
   let newPic = document.getElementById('new-pic')
   let form = document.querySelector('.comment-form');




   const getCat = async () => {
      const res = await fetch('/kitten/image');
      const json = await res.json()

      if (res.ok) {
         let catPic = document.querySelector('.cat-pic');
         catPic.setAttribute('src', json.src)
         loading.innerHTML = ''
      } else {
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
      if (event.target.id === "upvote" || event.target.id === "downvote") {
         const res = await fetch(`/kitten/${event.target.id}`, {
            method: "PATCH"
         })
         const json = await res.json()

         if (res.ok) {
            score.innerHTML = json.score
         } else {
            alert("Broken Button")
         }
      }
   })

   const showComment = function (comment) {
      let catComments = document.querySelector('.comments')
      let commentDiv = document.createElement('div');
      commentDiv.innerHTML = comment;
      catComments.appendChild(commentDiv)
   }

   form.addEventListener('submit', (event) => {
      event.preventDefault()
      const addComment = async (comment) => {
         const res = await fetch('/kitten/comments', {
            method: "POST",
            headers: {
               "Content-Type": 'application/json'
            },
            body: JSON.stringify({comment})
         })
         const json = await res.json()
         if (res.ok) {
            showComment(json.comments[json.comments.length - 1])
         }
         console.log(json)
      }
      const input = document.getElementById('user-comment').value
      addComment(input)
   })






})
