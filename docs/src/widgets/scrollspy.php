
        <section id="scrollspy" title="Scrollspy">
          <div class="page-header">
            <h1>Scrollspy</h1>
          </div>

            <h2>Example in navbar</h2>
          <p>The ScrollSpy plugin is for automatically updating nav targets based on scroll position. Scroll the area below the navbar and watch the active class change. The dropdown sub items will be highlighted as well.</p>

          <p>Simply use <code>havok/widget/_ScrollSpyMixin</code> with a nav widget, and set the <code>spyTarget</code> property.</p>

          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/NavBar" class="navbar-static">
                <div class="container" style="width: auto;">
                  <a class="brand" href="#">Project Name</a>
                  <ul data-dojo-type="havok/widget/NavBarLinks"
                      data-dojo-mixins="havok/widget/_ScrollSpyMixin"
                      data-dojo-props="
                      spyTarget: 'scrollspyExample1',
                      store:{
                        idProperty: 'text',
                        data: [
                            {text: '@superdweebie', spy: 'superdweebie'},
                            {text: '@crimsonronin', spy: 'crimsonronin'},
                            {type: 'dropdown', text: 'Dropdown'},
                            {text: 'one', spy: 'one', parent: 'Dropdown'},
                            {text: 'two', spy: 'two', parent: 'Dropdown'},
                            {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                            {text: 'three', spy: 'three', parent: 'Dropdown'}
                        ]
                      }"
                  >
                  </ul>
                </div>
            </div>
            <div id="scrollspyExample1" class="scrollspy-example">
              <h4 id="superdweebie">@superdweebie</h4>
              <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
              <h4 id="crimsonronin">@crimsonronin</h4>
              <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
              <h4 id="one">one</h4>
              <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
              <h4 id="two">two</h4>
              <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
              <h4 id="three">three</h4>
              <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
              <p>Keytar twee blog, culpa messenger bag marfa whatever delectus food truck. Sapiente synth id assumenda. Locavore sed helvetica cliche irony, thundercats you probably haven't heard of them consequat hoodie gluten-free lo-fi fap aliquip. Labore elit placeat before they sold out, terry richardson proident brunch nesciunt quis cosby sweater pariatur keffiyeh ut helvetica artisan. Cardigan craft beer seitan readymade velit. VHS chambray laboris tempor veniam. Anim mollit minim commodo ullamco thundercats.
              </p>
            </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/NavBar&quot; class=&quot;navbar-static&quot;&gt;
    &lt;div class=&quot;container&quot; style=&quot;width: auto;&quot;&gt;
      &lt;a class=&quot;brand&quot; href=&quot;#&quot;&gt;Project Name&lt;/a&gt;
      &lt;ul data-dojo-type=&quot;havok/widget/NavBarLinks&quot;
          data-dojo-mixins=&quot;havok/widget/_ScrollSpyMixin&quot;
          data-dojo-props=&quot;
          spyTarget: 'scrollspyExample1',
          store:{
            idProperty: 'text',
            data: [
                {text: '@superdweebie', spy: 'superdweebie'},
                {text: '@crimsonronin', spy: 'crimsonronin'},
                {type: 'dropdown', text: 'Dropdown'},
                {text: 'one', spy: 'one', parent: 'Dropdown'},
                {text: 'two', spy: 'two', parent: 'Dropdown'},
                {type: 'divider', text: 'divider1', parent: 'Dropdown'},
                {text: 'three', spy: 'three', parent: 'Dropdown'}
            ]
          }&quot;
      &gt;
      &lt;/ul&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div id=&quot;scrollspyExample1&quot; class=&quot;scrollspy-example&quot;&gt;
  &lt;h4 id=&quot;superdweebie&quot;&gt;@superdweebie&lt;/h4&gt;
  &lt;p&gt;...&lt;/p&gt;
  &lt;h4 id=&quot;crimsonronin&quot;&gt;@crimsonronin&lt;/h4&gt;
  &lt;p&gt;...&lt;/p&gt;
  &lt;h4 id=&quot;one&quot;&gt;one&lt;/h4&gt;
  &lt;p&gt;...&lt;/p&gt;
  &lt;h4 id=&quot;two&quot;&gt;two&lt;/h4&gt;
  &lt;p&gt;...&lt;/p&gt;
  &lt;h4 id=&quot;three&quot;&gt;three&lt;/h4&gt;
  &lt;p&gt;...&lt;/p&gt;
&lt;/div&gt;
</pre>

          <h2>Auto populate nav</h2>

          <p>ScrollSpy can autopopulate the nav using the <code>id</code> and <code>title</code> attributes of the child elemnts of <code>spyTarget</code>.</p>

          <div class="bs-docs-example">
<div class="row-fluid">
    <div class="span3">
        <ul data-dojo-type="havok/widget/NavPill"
            data-dojo-mixins="havok/widget/_ScrollSpyMixin"
            data-dojo-props="spyTarget: 'scrollspyExample2'"
            class="nav-stacked"
        >
        </ul>
    </div>
    <div id="scrollspyExample2" class="span9 scrollspy-example">
        <h4 id="superdweebie">@superdweebie</h4>
        <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
        <h4 id="crimsonronin">@crimsonronin</h4>
        <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
        <h4 id="one" title="ONE">one</h4>
        <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
        <h4 id="two" title="TWO">two</h4>
        <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
        <h4 id="three" title="THREE">three</h4>
        <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
        <p>Keytar twee blog, culpa messenger bag marfa whatever delectus food truck. Sapiente synth id assumenda. Locavore sed helvetica cliche irony, thundercats you probably haven't heard of them consequat hoodie gluten-free lo-fi fap aliquip. Labore elit placeat before they sold out, terry richardson proident brunch nesciunt quis cosby sweater pariatur keffiyeh ut helvetica artisan. Cardigan craft beer seitan readymade velit. VHS chambray laboris tempor veniam. Anim mollit minim commodo ullamco thundercats.
        </p>
    </div>
</div>
          </div>

<pre class="prettyprint linenums">
&lt;div class=&quot;row-fluid&quot;&gt;
    &lt;div class=&quot;span3&quot;&gt;
        &lt;ul data-dojo-type=&quot;havok/widget/NavPill&quot;
            data-dojo-mixins=&quot;havok/widget/_ScrollSpyMixin&quot;
            data-dojo-props=&quot;spyTarget: 'scrollspyExample2'&quot;
            class=&quot;nav-stacked&quot;
        &gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div id=&quot;scrollspyExample2&quot; class=&quot;span9 scrollspy-example&quot;&gt;
        &lt;h4 id=&quot;superdweebie&quot;&gt;@superdweebie&lt;/h4&gt;
        &lt;p&gt;...&lt;/p&gt;
        &lt;h4 id=&quot;crimsonronin&quot;&gt;@crimsonronin&lt;/h4&gt;
        &lt;p&gt;...&lt;/p&gt;
        &lt;h4 id=&quot;one&quot; title=&quot;ONE&quot;&gt;one&lt;/h4&gt;
        &lt;p&gt;...&lt;/p&gt;
        &lt;h4 id=&quot;two&quot; title=&quot;TWO&quot;&gt;two&lt;/h4&gt;
        &lt;p&gt;...&lt;/p&gt;
        &lt;h4 id=&quot;three&quot; title=&quot;THREE&quot;&gt;three&lt;/h4&gt;
        &lt;p&gt;...&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>

  <h2>Properties</h2>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">Name</th>
     <th style="width: 50px;">type</th>
     <th style="width: 50px;">default</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>spyTarget</td>
     <td>dom node</td>
     <td></td>
     <td>The dom node to spy on.</td>
   </tr>
  </tbody>
</table>

        </section>
