let quoteList = document.getElementById('quote-list')
let submitBtn = document.getElementById("new-quote-form")

document.addEventListener('DOMContentLoaded', () => {fetchQuotes()})


async function fetchQuotes(){
    fetch(`http://localhost:3000/quotes?_embed=likes`)
    .then(resp => resp.json())
    .then(quotesArr => {quotesArr.forEach(renderQuotes)})
   
}

/// Submit portion

async function renderQuotes(quoteObj){
   let quoteItem = document.createElement('li')
quoteItem.id = `${quoteObj.id}-card`

quoteItem.innerHTML = 
    `
    <blockquote class="blockquote">
      ${quoteObj.quote}
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success' id='like'>Likes: <span class='like-count'>0</span></button>
      <button class='btn-danger' id='delete'>Delete</button>
    </blockquote>
  `
  let likes = 0
  quoteItem.querySelector('#like').addEventListener('click', (e) => {
    likes++
    quoteItem.querySelector('span').textContent = likes
  })
  quoteItem.querySelector('#delete').addEventListener('click', (e) => {
deleteQuote(quoteObj)
quoteItem.remove()
  })
  quoteList.append(quoteItem)
  
  //document.querySelectorAll('h2').forEach(title => title.addEventListener('click', (e) => console.log(e.target)))


}

function likeTracker(quoteObj){
  fetch(`http://localhost:3000/likes`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "quoteId": quoteObj.id,
      "id": 2,
      "createdAt": 1558524358
    })
  }).then(res => res.json())
  .then(addQuote => console.log())
}




 

async function deleteQuote(quote){

   fetch(`http://localhost:3000/quotes/${quote.id}`,{
    method: 'DELETE',
    headers: {
        'Content-Type':'application/json'
    }
  })
    .then(res => res.json())
    .then((data) => console.log(data))
  }


  submitBtn.addEventListener('submit', e => {
    e.preventDefault()
    let newItem = {
      quote: document.getElementById('new-quote').value,
      author: document.getElementById('author').value
    }
    renderQuotes(newItem)
    addQuote(newItem)
    submitBtn.reset()
  })

  function addQuote(newQuote){
    fetch(`http://localhost:3000/quotes`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    }).then(res => res.json())
    .then(addQuote => console.log())
  }