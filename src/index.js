let quoteList = document.getElementById('quote-list')
let submitBtn = document.getElementById("new-quote-form")

document.addEventListener('DOMContentLoaded', () => {fetchQuotes()})
async function fetchQuotes(){
    fetch(`http://localhost:3000/quotes`)
    .then(resp => resp.json())
    .then(quotesArr => quotesArr.forEach(renderQuotes))
}

/// Submit portion

async function renderQuotes(quoteObj){
   let quoteItem = document.createElement('li')
  // let footer = document.getElementsByClassName('blockquote-footer')
  // let likeBtn = document.createElement('button')
  //let quoteP = document.createElement('p')
//// Advisor notes create elements individually
quoteItem.innerHTML = 
    `<li class='quote-card'>
    <blockquote class="blockquote">
      ${quoteObj.quote}
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`

  quoteList.append(quoteItem)

 // likeBtns.forEach((likeBtn) => likeBtn.addEventListener('click', (e) => console.log(e.target)))

}

let likeBtns = document.querySelectorAll('.btn-success')
console.log(likeBtns)

for (const like of likeBtns) {
  like.addEventListener('click', (e) => console.log('click'))
  
}


  let deleteBtns = document.querySelectorAll('.btn-danger')
  deleteBtns.forEach((deleteBtn) => deleteBtn.addEventListener('click', (e) => console.log(e.target)))



  submitBtn.addEventListener('submit', e => {
    e.preventDefault()
    let newItem = {
      quote: document.getElementById('new-quote').value,
      author: document.getElementById('author').value
    }
    renderQuotes(newItem)
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