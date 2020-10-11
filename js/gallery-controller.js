'use strict';

init()

function init() {
    renderProjs();
    renderSendBtn();
}

function renderSendBtn() {
    var email = $('.email').val()
    var subject = $('.subject').val()
    var msg = $('.message').val()
    var strHtml = `
    <button type="button" class="btn btn-success" onclick="onSendMsg()">Send</button>
    </a>`
    $('.form-btn').html(strHtml)
}

function onSendMsg() {
    var email = $('.email').val()
    var subject = $('.subject').val()
    var msg = $('.message').val()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=neho12@gmail.com&su=${subject}&body=${msg}from${email}`);
}

function renderProjs() {
    var projs = getProjs();
    var strHtmls = ``
    projs.forEach(function (proj) {
        strHtmls += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onModal('${proj.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <div class="item-img"><img class="img-fluid" src="img/portfolio/${proj.id}-s.png" alt=""></div>
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
    })
    var elPortfolio = $('.portfolio-container');
    elPortfolio.html(strHtmls);
}

function onModal(projId) {
    renderModal(projId);
}

function renderModal(projId) {
    var proj = getProjsById(projId);
    var strHtmls = `
    <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: N/A </li>
                  <li>labels: ${proj.labels}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
                  <a href="/projs/${proj.id}/">
                <button class="btn btn-primary" type="button">Check It Out!
</button><a>`
    var elModal = $('.modal-body');
    elModal.html(strHtmls)

}