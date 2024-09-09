// document.getElementById('about-toggle').addEventListener('click', function() {
//     var details = document.getElementById('about-details');
//     var summary = document.getElementsById('about-toggle');
//     if (details.style.display === 'none' || details.style.display === '') {
//         details.style.display = 'block';
//         summary.style.display = 'none';
//     } else {
//         details.style.display = 'none';
//         summary.style.display = 'block';
//     }
// });

// document.getElementById('about-summary-text').addEventListener('click', function() {
//     var details = document.getElementById('about-details');
//     if (details.style.display === 'none' || details.style.display === '') {
//         details.style.display = 'block';
//         this.style.display = 'none';
//     } else {
//         details.style.display = 'none';
//         this.style.display = 'block';
//     }
// });


// document.getElementById('collapse-button').addEventListener('click', function() {
//     var details = document.getElementById('about-details');
//     var summary = document.getElementsById('about-toggle');
//     details.style.display = 'none';
//     summary.style.display = 'block';
// });

document.getElementById('about-toggle').addEventListener('click', function() {
    var details = document.getElementById('about-details');
    var summary = document.getElementById('about-toggle');
    details.style.display = 'block';
    summary.style.display = 'none';
});

document.getElementById('collapse-button').addEventListener('click', function() {
    var details = document.getElementById('about-details');
    var summary = document.getElementById('about-toggle');
    details.style.display = 'none';
    summary.style.display = 'block';
});
