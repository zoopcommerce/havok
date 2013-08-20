<!-- Subhead
================================================== -->
<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>Forms</h1>
    <p class="lead">Dozens of reusable input widgets to prompt and validate all sorts of data.</p>
  </div>
</header>


  <div class="container">

    <!-- Docs nav
    ================================================== -->
    <div class="row">
      <div class="span3 bs-docs-sidebar">
        <ul data-dojo-type="havok/widget/NavList"
            data-dojo-mixins="havok/widget/_AffixMixin, havok/widget/_ScrollSpyMixin"
            data-dojo-props="
               linkTemplate: '&lt;a role=&quot;navitem&quot; href=&quot;${href}&quot;&gt;&lt;i class=&quot;icon-chevron-right&quot;&gt;&lt;/i&gt; ${text}&lt;/a&gt;',
               viewportOffset: {top: 40, bottom: 0},
               affixTarget: 'mainContent',
               spyTarget: 'mainContent'
            "
            class="nav-stacked bs-docs-sidenav"
        >
        </ul>
      </div>
    <div class="span9" id="mainContent">

        <?php
//        include 'forms/using-forms.php';
//        include 'forms/using-form-widgets.php';
//        include 'forms/textbox.php';
//        include 'forms/validation-textbox.php';
//        include 'forms/number-textbox.php';
//        include 'forms/currency-textbox.php';
//        include 'forms/date-textbox.php';
//        include 'forms/password-textbox.php';
//        include 'forms/email-textbox.php';
//        include 'forms/textarea.php';
//        include 'forms/text-editor.php';
//        include 'forms/checkbox.php';
//        include 'forms/radio-group.php';
        include 'forms/select.php';
//        include 'forms/typeahead.php';
//        include 'forms/hexcolor.php';
//        include 'forms/color-picker.php';
//        include 'forms/validation-group.php';
//        include 'forms/credit-card-expiry.php';
        ?>
      </div>
    </div>

  </div>
