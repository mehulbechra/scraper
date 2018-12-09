// Create a post request
function postSearchValue(e) {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: `/api/search/${$('#search-input').val()}`,
  }).done(() => {
    $('#search-input').val('');
  }).fail(() => {
    console.log('failed');
  });
}

// On document ready
$(document).ready(() => {
  $('#submit-button').on('click', postSearchValue);
});
