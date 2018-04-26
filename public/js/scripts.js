'use strict';


// Function to dynamically build page Elements
function displayReview(review) {
  var reviewsDiv = document.getElementById('reviewsDiv');
  
  var spacer = document.createTextNode(' / ' );
  var headSpacer =  document.createTextNode( '\u00A0\u00A0' );
  var br = document.createElement('br');

  var title = document.createTextNode(review.title + ';');
  var titleName = document.createTextNode("Title:");
  var author = document.createTextNode(review.author + ';');
  var authorName = document.createTextNode("Author:");
  var reviewer = document.createTextNode(review.reviewer);
  var reviewerName = document.createTextNode("Reviewer:");
  var reviewDesc = document.createTextNode(review.review);

  var h4 = document.createElement('h4');
 
  h4.appendChild(titleName); 
  h4.appendChild(title);
  h4.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
  h4.appendChild(authorName); 
  h4.appendChild(author);
  h4.appendChild( document.createTextNode( '\u00A0\u00A0' ) );
  h4.appendChild(reviewerName); 
  h4.appendChild(reviewer);
  h4.appendChild(headSpacer);
  h4.appendChild( document.createTextNode( '\u00A0\u00A0' ) );

  var reviewDetails = document.createElement('p');
  
  reviewDetails.appendChild(br);
  reviewDetails.appendChild(reviewDesc);
  
  var actionsDiv = document.createElement('div');

  var editLink = document.createElement('a');
  editLink.setAttribute('href', `#`);
  editLink.innerHTML = 'edit';

  editLink.addEventListener('click', (e) => {
    e.preventDefault();
    getReview(review._id);
  });

  var deleteLink = document.createElement('a');
  deleteLink.setAttribute('href', '#');
  deleteLink.innerHTML = 'delete';

  deleteLink.addEventListener('click', (e) => {
    e.preventDefault();
    deleteReview(review._id);
  });


  actionsDiv.appendChild(editLink);
  actionsDiv.appendChild(spacer);
  actionsDiv.appendChild(deleteLink);

  reviewsDiv.appendChild(h4);
  reviewsDiv.appendChild(reviewDetails);
  reviewsDiv.appendChild(actionsDiv);
}

// AJAX GET request - all Reviews 
function getReviews() {
  $.getJSON('/api', () => {
    $('#editReviewsBtns').hide();
  })
  .done((reviews) => {
    reviews.forEach((review) => {
      displayReview(review);
    });
  })
  .fail((e) => {
    console.log(e);
  });
}

// AJAX POST request - New Review 
function createReview() {
 $.ajax({
  type: 'POST',
  url: '/api/create',
  data: JSON.stringify({
    'title': $('#title').val(),
    'author': $('#author').val(),
    'reviewer': $('#reviewer').val(),
    'review': $('#review').val()
  }), 
  success: (review) => { 
    $('#title').val('');
    $('#author').val('');
    $('#reviewer').val('');
    $('#review').val('');
    displayReview(review); 
  },
    contentType: "application/json",
    dataType: 'json'
  });
}

// AJAX GET request - SingleReview 
function getReview(id) {
  $('#addReviewBtns').hide();
  $('#reviewsDiv').hide();
  $('#editReviewBtns').show();
  $.getJSON(`/api/${id}`, () => {
  })
  .done((br) => {
    $('#title').val(br.title);
    $('#author').val(br.author);
    $('#reviewer').val(br.reviewer);
    $('#review').val(br.review);
    $('#editId').val(id);
    $('#editReviewBtns').show();
  })
  .fail((e) => {
    console.log(e);
  });
}

// AJAX PUT - Update Review 
function updateReview() {
  $.ajax({
    type: 'PUT',
    url: '/api/update',
    data: JSON.stringify({
      'bookreviewid': $('#editId').val(),
      'title': $('#title').val(),
      'author': $('#author').val(),
      'reviewer': $('#reviewer').val(),
      'review': $('#review').val()
    }), 
    success: (review) => { 
      document.location.href="/";
    },
      contentType: "application/json",
      dataType: 'json'
    });
}

// AJAX DELETE request - Delete Review 
function deleteReview(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/delete',
    data: JSON.stringify({
      'bookreviewid': id
    }), 
    success: (review) => { 
      document.location.href="/";
    },
      contentType: "application/json",
      dataType: 'json'
    });
}

$(document).ready(() => {
  $('#bookReviewForm').submit((e) => {
    e.preventDefault();
    createReview();
  });


  $('#editBtn').click((e) => {
    e.preventDefault();
    updateReview();
  })
  $('#editReviewBtns').hide();
  console.log("XXXXXXXXXXXXXXXXXXX");
  getReviews();
});
