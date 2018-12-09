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

$(document).ready(() => {
  $('#submit-button').on('click', postSearchValue);
});
