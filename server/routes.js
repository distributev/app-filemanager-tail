/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import kue from 'kue';
import _ from 'lodash';
import he from 'he';

export default function(app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/app', require('./api/app'));
  app.use('/api/jobs', require('./api/jobs'));
  app.use('/api/kue', kue.app);
  app.use('/api/filemanager', require('./api/fileManager'));
  app.use('/api/tail', require('./api/tail'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/theapp')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  app.route('/theapp/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  // All other routes
  app.route('/*')
    .get((req, res) => {
      // Check if there is a document with that url
      getDocument(req.path, function(err, doc) {
        if (err) {
          res.render(path.join(app.get('frontendPath'), '404'));
        }
        else {
          res.render(path.join(app.get('frontendPath'), 'document'), {}, function(err, html) {
            res.send(html.replace('[[doc_html]]', '<iframe src="" srcdoc="' +  he.escape(doc.html) + '" frameborder="0" scrollbar="false" onload="' + he.escape("this.style.height=this.contentDocument.body.scrollHeight + 'px';") + '" class="col-xs-12"></iframe>'));
          });
        }
      });
    });
}

function getDocument(permalink, cb) {
  var docs = [{
    htmlpermalink: '/documents/invoices/111',
    html: getHtml('111')
  },
  {
    htmlpermalink: '/invoices/222',
    html: getHtml('222')
  },
  {
    htmlpermalink: '/invoices/2016/07/333',
    html: getHtml('333')
  }];
  var doc = _.find(docs, { htmlpermalink: permalink });
  if (!doc) {
    return cb('Document not found');
  }
  else {
    return cb(null, doc);
  }
}

function getHtml(id) {
  var htmlTemplate = `
        <style type="text/css">

  /**********************************************
  * Ink v1.0.5 - Copyright 2013 ZURB Inc        *
  **********************************************/

  /* Client-specific Styles & Reset */

  #outlook a {
    padding:0;
  }

  body{
    width:100% !important;
    min-width: 100%;
    -webkit-text-size-adjust:100%;
    -ms-text-size-adjust:100%;
    margin:0;
    padding:0;
  }

  .ExternalClass {
    width:100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  #backgroundTable {
    margin:0;
    padding:0;
    width:100% !important;
    line-height: 100% !important;
  }

  img {
    outline:none;
    text-decoration:none;
    -ms-interpolation-mode: bicubic;
    width: auto;
    max-width: 100%;
    float: left;
    clear: both;
    display: block;
  }

  center {
    width: 100%;
    min-width: 580px;
  }

  a img {
    border: none;
  }

  p {
    margin: 0 0 0 10px;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td {
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    border-collapse: collapse !important;
  }

  table, tr, td {
    padding: 0;
    vertical-align: top;
    text-align: left;
  }

  hr {
    color: #d9d9d9;
    background-color: #d9d9d9;
    height: 1px;
    border: none;
  }

  /* Responsive Grid */

  table.body {
    height: 100%;
    width: 100%;
  }

  table.container {
    width: 580px;
    margin: 0 auto;
    text-align: inherit;
  }

  table.row {
    padding: 0px;
    width: 100%;
    position: relative;
  }

  table.container table.row {
    display: block;
  }

  td.wrapper {
    padding: 10px 20px 0px 0px;
    position: relative;
  }

  table.columns,
  table.column {
    margin: 0 auto;
  }

  table.columns td,
  table.column td {
    padding: 0px 0px 10px;
  }

  table.columns td.sub-columns,
  table.column td.sub-columns,
  table.columns td.sub-column,
  table.column td.sub-column {
    padding-right: 10px;
  }

  td.sub-column, td.sub-columns {
    min-width: 0px;
  }

  table.row td.last,
  table.container td.last {
    padding-right: 0px;
  }

  table.one { width: 30px; }
  table.two { width: 80px; }
  table.three { width: 130px; }
  table.four { width: 180px; }
  table.five { width: 230px; }
  table.six { width: 280px; }
  table.seven { width: 330px; }
  table.eight { width: 380px; }
  table.nine { width: 430px; }
  table.ten { width: 480px; }
  table.eleven { width: 530px; }
  table.twelve { width: 580px; }

  table.one center { min-width: 30px; }
  table.two center { min-width: 80px; }
  table.three center { min-width: 130px; }
  table.four center { min-width: 180px; }
  table.five center { min-width: 230px; }
  table.six center { min-width: 280px; }
  table.seven center { min-width: 330px; }
  table.eight center { min-width: 380px; }
  table.nine center { min-width: 430px; }
  table.ten center { min-width: 480px; }
  table.eleven center { min-width: 530px; }
  table.twelve center { min-width: 580px; }

  table.one .panel center { min-width: 10px; }
  table.two .panel center { min-width: 60px; }
  table.three .panel center { min-width: 110px; }
  table.four .panel center { min-width: 160px; }
  table.five .panel center { min-width: 210px; }
  table.six .panel center { min-width: 260px; }
  table.seven .panel center { min-width: 310px; }
  table.eight .panel center { min-width: 360px; }
  table.nine .panel center { min-width: 410px; }
  table.ten .panel center { min-width: 460px; }
  table.eleven .panel center { min-width: 510px; }
  table.twelve .panel center { min-width: 560px; }

  .body .columns td.one,
  .body .column td.one { width: 8.333333%; }
  .body .columns td.two,
  .body .column td.two { width: 16.666666%; }
  .body .columns td.three,
  .body .column td.three { width: 25%; }
  .body .columns td.four,
  .body .column td.four { width: 33.333333%; }
  .body .columns td.five,
  .body .column td.five { width: 41.666666%; }
  .body .columns td.six,
  .body .column td.six { width: 50%; }
  .body .columns td.seven,
  .body .column td.seven { width: 58.333333%; }
  .body .columns td.eight,
  .body .column td.eight { width: 66.666666%; }
  .body .columns td.nine,
  .body .column td.nine { width: 75%; }
  .body .columns td.ten,
  .body .column td.ten { width: 83.333333%; }
  .body .columns td.eleven,
  .body .column td.eleven { width: 91.666666%; }
  .body .columns td.twelve,
  .body .column td.twelve { width: 100%; }

  td.offset-by-one { padding-left: 50px; }
  td.offset-by-two { padding-left: 100px; }
  td.offset-by-three { padding-left: 150px; }
  td.offset-by-four { padding-left: 200px; }
  td.offset-by-five { padding-left: 250px; }
  td.offset-by-six { padding-left: 300px; }
  td.offset-by-seven { padding-left: 350px; }
  td.offset-by-eight { padding-left: 400px; }
  td.offset-by-nine { padding-left: 450px; }
  td.offset-by-ten { padding-left: 500px; }
  td.offset-by-eleven { padding-left: 550px; }

  td.expander {
    visibility: hidden;
    width: 0px;
    padding: 0 !important;
  }

  table.columns .text-pad,
  table.column .text-pad {
    padding-left: 10px;
    padding-right: 10px;
  }

  table.columns .left-text-pad,
  table.columns .text-pad-left,
  table.column .left-text-pad,
  table.column .text-pad-left {
    padding-left: 10px;
  }

  table.columns .right-text-pad,
  table.columns .text-pad-right,
  table.column .right-text-pad,
  table.column .text-pad-right {
    padding-right: 10px;
  }

  /* Block Grid */

  .block-grid {
    width: 100%;
    max-width: 580px;
  }

  .block-grid td {
    display: inline-block;
    padding:10px;
  }

  .two-up td {
    width:270px;
  }

  .three-up td {
    width:173px;
  }

  .four-up td {
    width:125px;
  }

  .five-up td {
    width:96px;
  }

  .six-up td {
    width:76px;
  }

  .seven-up td {
    width:62px;
  }

  .eight-up td {
    width:52px;
  }

  /* Alignment & Visibility Classes */

  table.center, td.center {
    text-align: center;
  }

  h1.center,
  h2.center,
  h3.center,
  h4.center,
  h5.center,
  h6.center {
    text-align: center;
  }

  span.center {
    display: block;
    width: 100%;
    text-align: center;
  }

  img.center {
    margin: 0 auto;
    float: none;
  }

  .show-for-small,
  .hide-for-desktop {
    display: none;
  }

  /* Typography */

  body, table.body, h1, h2, h3, h4, h5, h6, p, td {
    color: #222222;
    font-family: "Helvetica", "Arial", sans-serif;
    font-weight: normal;
    padding:0;
    margin: 0;
    text-align: left;
    line-height: 1.3;
  }

  h1, h2, h3, h4, h5, h6 {
    word-break: normal;
  }

  h1 {font-size: 40px;}
  h2 {font-size: 36px;}
  h3 {font-size: 32px;}
  h4 {font-size: 28px;}
  h5 {font-size: 24px;}
  h6 {font-size: 20px;}
  body, table.body, p, td {font-size: 14px;line-height:19px;}

  p.lead, p.lede, p.leed {
    font-size: 18px;
    line-height:21px;
  }

  p {
    margin-bottom: 10px;
  }

  small {
    font-size: 10px;
  }

  a {
    color: #2ba6cb;
    text-decoration: none;
  }

  a:hover {
    color: #2795b6 !important;
  }

  a:active {
    color: #2795b6 !important;
  }

  a:visited {
    color: #2ba6cb !important;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    color: #2ba6cb;
  }

  h1 a:active,
  h2 a:active,
  h3 a:active,
  h4 a:active,
  h5 a:active,
  h6 a:active {
    color: #2ba6cb !important;
  }

  h1 a:visited,
  h2 a:visited,
  h3 a:visited,
  h4 a:visited,
  h5 a:visited,
  h6 a:visited {
    color: #2ba6cb !important;
  }

  /* Panels */

  .panel {
    background: #f2f2f2;
    border: 1px solid #d9d9d9;
    padding: 10px !important;
  }

  .sub-grid table {
    width: 100%;
  }

  .sub-grid td.sub-columns {
    padding-bottom: 0;
  }

  /* Buttons */

  table.button,
  table.tiny-button,
  table.small-button,
  table.medium-button,
  table.large-button {
    width: 100%;
    overflow: hidden;
  }

  table.button td,
  table.tiny-button td,
  table.small-button td,
  table.medium-button td,
  table.large-button td {
    display: block;
    width: auto !important;
    text-align: center;
    background: #2ba6cb;
    border: 1px solid #2284a1;
    color: #ffffff;
    padding: 8px 0;
  }

  table.tiny-button td {
    padding: 5px 0 4px;
  }

  table.small-button td {
    padding: 8px 0 7px;
  }

  table.medium-button td {
    padding: 12px 0 10px;
  }

  table.large-button td {
    padding: 21px 0 18px;
  }

  table.button td a,
  table.tiny-button td a,
  table.small-button td a,
  table.medium-button td a,
  table.large-button td a {
    font-weight: bold;
    text-decoration: none;
    font-family: Helvetica, Arial, sans-serif;
    color: #ffffff;
    font-size: 16px;
  }

  table.tiny-button td a {
    font-size: 12px;
    font-weight: normal;
  }

  table.small-button td a {
    font-size: 16px;
  }

  table.medium-button td a {
    font-size: 20px;
  }

  table.large-button td a {
    font-size: 24px;
  }

  table.button:hover td,
  table.button:visited td,
  table.button:active td {
    background: #2795b6 !important;
  }

  table.button:hover td a,
  table.button:visited td a,
  table.button:active td a {
    color: #fff !important;
  }

  table.button:hover td,
  table.tiny-button:hover td,
  table.small-button:hover td,
  table.medium-button:hover td,
  table.large-button:hover td {
    background: #2795b6 !important;
  }

  table.button:hover td a,
  table.button:active td a,
  table.button td a:visited,
  table.tiny-button:hover td a,
  table.tiny-button:active td a,
  table.tiny-button td a:visited,
  table.small-button:hover td a,
  table.small-button:active td a,
  table.small-button td a:visited,
  table.medium-button:hover td a,
  table.medium-button:active td a,
  table.medium-button td a:visited,
  table.large-button:hover td a,
  table.large-button:active td a,
  table.large-button td a:visited {
    color: #ffffff !important;
  }

  table.secondary td {
    background: #e9e9e9;
    border-color: #d0d0d0;
    color: #555;
  }

  table.secondary td a {
    color: #555;
  }

  table.secondary:hover td {
    background: #d0d0d0 !important;
    color: #555;
  }

  table.secondary:hover td a,
  table.secondary td a:visited,
  table.secondary:active td a {
    color: #555 !important;
  }

  table.success td {
    background: #5da423;
    border-color: #457a1a;
  }

  table.success:hover td {
    background: #457a1a !important;
  }

  table.alert td {
    background: #c60f13;
    border-color: #970b0e;
  }

  table.alert:hover td {
    background: #970b0e !important;
  }

  table.radius td {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  table.round td {
    -webkit-border-radius: 500px;
    -moz-border-radius: 500px;
    border-radius: 500px;
  }

  /* Outlook First */

  body.outlook p {
    display: inline !important;
  }

  /*  Media Queries */

  @media only screen and (max-width: 600px) {

    table[class="body"] img {
      width: auto !important;
      height: auto !important;
    }

    table[class="body"] center {
      min-width: 0 !important;
    }

    table[class="body"] .container {
      width: 95% !important;
    }

    table[class="body"] .row {
      width: 100% !important;
      display: block !important;
    }

    table[class="body"] .wrapper {
      display: block !important;
      padding-right: 0 !important;
    }

    table[class="body"] .columns,
    table[class="body"] .column {
      table-layout: fixed !important;
      float: none !important;
      width: 100% !important;
      padding-right: 0px !important;
      padding-left: 0px !important;
      display: block !important;
    }

    table[class="body"] .wrapper.first .columns,
    table[class="body"] .wrapper.first .column {
      display: table !important;
    }

    table[class="body"] table.columns td,
    table[class="body"] table.column td {
      width: 100% !important;
    }

    table[class="body"] .columns td.one,
    table[class="body"] .column td.one { width: 8.333333% !important; }
    table[class="body"] .columns td.two,
    table[class="body"] .column td.two { width: 16.666666% !important; }
    table[class="body"] .columns td.three,
    table[class="body"] .column td.three { width: 25% !important; }
    table[class="body"] .columns td.four,
    table[class="body"] .column td.four { width: 33.333333% !important; }
    table[class="body"] .columns td.five,
    table[class="body"] .column td.five { width: 41.666666% !important; }
    table[class="body"] .columns td.six,
    table[class="body"] .column td.six { width: 50% !important; }
    table[class="body"] .columns td.seven,
    table[class="body"] .column td.seven { width: 58.333333% !important; }
    table[class="body"] .columns td.eight,
    table[class="body"] .column td.eight { width: 66.666666% !important; }
    table[class="body"] .columns td.nine,
    table[class="body"] .column td.nine { width: 75% !important; }
    table[class="body"] .columns td.ten,
    table[class="body"] .column td.ten { width: 83.333333% !important; }
    table[class="body"] .columns td.eleven,
    table[class="body"] .column td.eleven { width: 91.666666% !important; }
    table[class="body"] .columns td.twelve,
    table[class="body"] .column td.twelve { width: 100% !important; }

    table[class="body"] td.offset-by-one,
    table[class="body"] td.offset-by-two,
    table[class="body"] td.offset-by-three,
    table[class="body"] td.offset-by-four,
    table[class="body"] td.offset-by-five,
    table[class="body"] td.offset-by-six,
    table[class="body"] td.offset-by-seven,
    table[class="body"] td.offset-by-eight,
    table[class="body"] td.offset-by-nine,
    table[class="body"] td.offset-by-ten,
    table[class="body"] td.offset-by-eleven {
      padding-left: 0 !important;
    }

    table[class="body"] table.columns td.expander {
      width: 1px !important;
    }

    table[class="body"] .right-text-pad,
    table[class="body"] .text-pad-right {
      padding-left: 10px !important;
    }

    table[class="body"] .left-text-pad,
    table[class="body"] .text-pad-left {
      padding-right: 10px !important;
    }

    table[class="body"] .hide-for-small,
    table[class="body"] .show-for-desktop {
      display: none !important;
    }

    table[class="body"] .show-for-small,
    table[class="body"] .hide-for-desktop {
      display: inherit !important;
    }
  }

        </style>
        <style type="text/css">

  table.button td,
  table.tiny-button td,
  table.small-button td,
  table.medium-button td,
  table.large-button td {
    display: block;
    width: auto !important;
    text-align: center;
    background:#0074d9;
    color: #ffffff;
    padding: 8px 0;
  }

  table.button:hover td,
  table.button:visited td,
  table.button:active td {
    background: #0065bc !important;
  }

  a {
    color:#0074d9;
  }

  a:hover, a:focus, a:active, a:visited {
    color:#0074d9 !important;
    text-decoration: underline;
  }

  code {
    padding:2px 4px;
    font-size:90%;
    color:#c7254e;
    background-color:#f9f2f4;
    border-radius:4px;
  }

  blockquote {
    padding:10px 20px;
    margin:0 0 20px;
    font-size:18px;
    border-left:5px solid #eee;
  }
  blockquote p {
    font-size:18px;
  }
  ol, ul {
    margin:0 0 30px 0;
  }
  hr {
    margin: 30px 0;
  }
  center>h1, center>h2, center>h3, center>h4, center>h5, center>h6, center>p {
    text-align: center;
  }
  h1 {
    font-size: 36px;
    line-height: 1.5;
    font-weight: bold;
    padding-bottom:15px;
  }
  h1 small, h2 small, h3 small, h4 small, h5 small, h6 small {
    font-size:65%;
    color:#777;
    font-weight: normal;
    display: block;
  }

  h2 {
    font-size: 30px;
    line-height: 1.5;
    font-weight: bold;
    padding-bottom:10px;
  }

  h3 {
    font-size: 24px;
    line-height: 1.5;
    font-weight: bold;
    padding-bottom:10px;
  }

  h4 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: bold;
    padding-bottom:10px;
  }

  h5 {
    font-size: 14px;
    line-height: 1.5;
    font-weight: bold;
    padding-bottom:10px;
  }

  h6 {
    font-size: 12px;
    line-height: 1.5;
    font-weight: bold;
  }
  p {
    line-height: 1.5;
  }
  img {
    width: 100%;
  }

        </style>
      </head>
      <body>
        <table class="body">
          <tr>
            <td class="center" align="center" valign="top">
              <center>


    <table class="body" style="margin:20px auto;">
      <tbody><tr>
        <td class="center" align="center" valign="top">
          <center>

            <table class="container">
            <tbody>
            <tr>
            <td>
    <p></p><center><p></p>

  <h1><u>Nike World</u></h1>

  <p></p></center><p></p>

  </td></tr><tr><td><table class="row"><tbody><tr><td class="wrapper"><table class="four columns"><tbody><tr><td>

  <p><strong></strong></p>

  <p>One Bowerman Drive</p>

  <p>Beaverton, OR 97005</p>

  <p>Phone: 1-503-671-6453</p>

  <p>7:30 a.m. - 5:30 p.m. PT, Monday - Friday (except holidays).</p>

  <p></p></td><td class="expander"></td></tr></tbody></table></td><td class="wrapper"><table class="four columns"><tbody><tr><td>
  </td><td class="expander"></td></tr></tbody></table></td><td class="wrapper last"><table class="four columns"><tbody><tr><td>
  <strong><u>Client Details</u></strong><p></p>

  <p>Company {{id}}</p>

  </td><td class="expander"></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td>

  <p></p><center><p></p>

  <h1>INVOICE</h1>

  <p></p></center><p></p>

  <p><strong>No: </strong> {{id}}</p>

  <p><strong>Date: </strong> July 07, 2016
  <br>
  <br></p>

  <table>
    <thead>
      <tr>
        <th width="200">Product/Services</th>
        <th>Fees ($)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Product for {{id}}</td>
        <td>{{id}}</td>
      </tr>
    </tbody>
  </table>

  <p><br>
  <br></p>

  <p><strong>Account No: </strong> 12345678789<br>
  <strong>IBAN: </strong> BR 1234 5678 7890<br>
  <strong>SWIFT (BIC Code): </strong> BRYPC2N</p>

  <hr>
            </td>
            </tr>
            </tbody>
            </table>

          </center>
        </td>
      </tr>
    </tbody></table>


              </center>
            </td>
          </tr>
        </table>
      </body>`;
  return htmlTemplate.split('{{id}}').join(id);
}
