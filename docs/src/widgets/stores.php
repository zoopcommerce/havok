<section id="stores" title="Stores">
  <div class="page-header">
    <h1>Stores</h1>
  </div>

  <p>Many of the havok widgets use the <code>havok/widget/_StoreMixin</code> to manage lists of items. Stores allow great flexibility. Items may be fetched via ajax, filtered, sorted, and reused throughout your application.</p>

  <h2>Supporting Widgets</h2>
  <p>Stores are supported by the following widgets:</p>
  <ul>
      <li><code>havok/widge/Dropdown</code></li>
      <li><code>havok/widge/ButtonGroup</code></li>
  </ul>
  <h2>Properties</h2>
  <p>This mixin adds four properties to any widget using it:</p>

<table class="table table-bordered table-striped">
  <thead>
   <tr>
     <th style="width: 100px;">name</th>
     <th style="width: 50px;">type</th>
     <th style="width: 50px;">default</th>
     <th>description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
        <td>store</td>
        <td>object</td>
        <td>undefined</td>
        <td><p>The <code>dojo/store</code> instance used by the widget. May be set in one of three different ways:</p>
            <ul>
                <li><em>string</em> if a string is passed, it is treated as the name of a store in the <code>havok/store/manager</code>, and retrieved from there.</li>
                <li><em>data object</em> if an object is passed that does not have a query property, it is treated as the construtor options to create an instance of <code>dojo/store/Memory</code>.</li>
                <li><em>store object</em> if an object is passed that does have a query property, it is expected to implement the <code>dojo/store/api</code>.</li>
                <li><em>implicit</em> if the store is not explicitly set, a store will be created by reading the dom.</li>
            </ul>
            <p>When getting, the store object is returned</p>
        </td>
    </tr>
    <tr>
        <td>query</td>
        <td>object</td>
        <td>undefined</td>
        <td>A query object used to interogate the store.</td>
    </tr>
    <tr>
        <td>queryOptions</td>
        <td>object</td>
        <td>undefined</td>
        <td>Options for <code>start</code> <code>count</code> and <code>sort</code>.</td>
    </tr>
    <tr>
        <td>queryThrottle</td>
        <td>integer</td>
        <td>0</td>
        <td>Minimum time in milliseconds between queries on the store. Great for ajax backed stores on a Typeahead to prevent too many requests.</td>
    </tr>
    <tr>
        <td>data</td>
        <td>object</td>
        <td>undefined</td>
        <td>Read only. Returns a data set from the store using the query and queryOptions.</td>
    </tr>
  </tbody>
</table>

  <h2>Examples</h2>

    <h3>Declative store</h3>
    <p>Store data may be passed in using the <code>data-dojo-props</code> attribute</p>
    <div class="bs-docs-example">
        <div class="dropdown clearfix">
          <ul data-dojo-type="havok/widget/Dropdown"
              data-dojo-props="store: {
                  data: [
                      {id: 0, text: 'Action'},
                      {id: 1, text: 'Another Action'},
                      {id: 2, text: 'Something else here'},
                      {id: 3, type: 'divider'},
                      {id: 4, href: '#dropdowns', text: 'Dropdowns'}
                  ]
              }"
              style="display: block; position: static; margin-bottom: 5px; *width: 180px;"
          ></ul>
        </div>
    </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
    data-dojo-props=&quot;store: {
        data: [
            {id: 0, text: 'Action'},
            {id: 1, text: 'Another Action'},
            {id: 2, text: 'Something else here'},
            {id: 3, type: 'divider'},
            {id: 4, href: '#dropdowns', text: 'Dropdowns'}
        ]
    }&quot;
&gt;&lt;/ul&gt;
</pre>

    <h3>Programatic store</h3>
    <p>A store can be created progamatically and passed to the widget. Eg:</p>
    <div class="bs-docs-example">
      <div id="dropdown2" class="dropdown clearfix"></div>
    <script type="text/javascript">
        require(
            ['dojo/dom', 'havok/widget/Dropdown', 'dojo/store/Memory', 'dojo/domReady!'],
            function(dom, Dropdown, Memory){
                var dropdown = new Dropdown({ //create a new instance of the Dropdown widget
                    store: new Memory({ //create a new instance of a Memory store for the dropdown widget to consume
                        data: [
                            {id: 0, text: 'Action'},
                            {id: 1, text: 'Another Action'},
                            {id: 2, text: 'Something else here'},
                            {id: 3, type: 'divider'},
                            {id: 4, href: '#dropdowns', text: 'Dropdowns'}
                        ]
                    }),
                    style: 'display: block; position: static; margin-bottom: 5px; *width: 180px;'
                });
                dom.byId('dropdown2').appendChild(dropdown.domNode); //add the dropdown to the dom
                dropdown.startup(); //call startup on the dropdown
            }
        )
    </script>
    </div>
<pre class="prettyprint linenums">
&lt;div id=&quot;dropdown2&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  require(
      ['dojo/dom', 'havok/widget/Dropdown', 'dojo/store/Memory', 'dojo/domReady!'],
      function(dom, Dropdown, Memory){
          var dropdown = new Dropdown({ //create a new instance of the Dropdown widget
              store: new Memory({ //create a new instance of a Memory store for the dropdown widget to consume
                  data: [
                      {id: 0, text: 'Action'},
                      {id: 1, text: 'Another Action'},
                      {id: 2, text: 'Something else here'},
                      {id: 3, type: 'divider'},
                      {id: 4, href: '#dropdowns', text: 'Dropdowns'}
                  ]
              })
          });
          dom.byId('dropdown2').appendChild(dropdown.domNode); //add the dropdown to the dom
          dropdown.startup(); //call startup on the dropdown
      }
  )
&lt;/script&gt;

</pre>

          <h3>Store from the Store Manager</h3>
          <p>The store manager allows data store to be easily interchanged and injected into store consumers. To use a store from the manager, set the store property to the name used to register that store with the manager. Eg:</p>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
                <ul data-dojo-type="havok/widget/Dropdown"
                    data-dojo-props="store: 'dropdownStore'"
                    style="display: block; position: static; margin-bottom: 5px; *width: 180px;"
                ></ul>
                <script type="text/javascript">
                    require([
                        'havok/get!havok/store/manager', //get the store manager instance from the havok dependency injection container
                        'dojo/store/Memory'
                    ],
                        function(storeManager, Memory){
                            storeManager.stores.push( //add a new store to the store manager
                                new Memory({
                                    name: 'dropdownStore', //give the store a name so it can be fetched with that name
                                    data: [
                                        {id: 0, text: 'Action'},
                                        {id: 1, text: 'Another Action'},
                                        {id: 2, text: 'Something else here'},
                                        {id: 3, type: 'divider'},
                                        {id: 4, href: '#dropdowns', text: 'Dropdowns'}
                                    ]
                                })
                            );
                        }
                    )
                </script>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
    data-dojo-props=&quot;store: 'dropdownStore'&quot;
&gt;&lt;/ul&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
    require([
        'havok/get!havok/store/manager', //get the store manager instance from the havok dependency injection container
        'dojo/store/Memory'
    ],
        function(storeManager, Memory){
            storeManager.stores.push( //add a new store to the store manager
                new Memory({
                    name: 'dropdownStore', //give the store a name so it can be fetched with that name
                    data: [
                        {id: 0, text: 'Action'},
                        {id: 1, text: 'Another Action'},
                        {id: 2, text: 'Something else here'},
                        {id: 3, type: 'divider'},
                        {id: 4, href: '#dropdowns', text: 'Dropdowns'}
                    ]
                })
            );
        }
    )
&lt;/script&gt;
</pre>

    <h3>Implicit store</h3>
    <p>If no store is set by one of the above methods, a store is created implicitly from the markup. For example, in the Dropdown widget each <code>li</code> becomes an item in the store with the following structure: <code>{id: id, node: node}</code>.</p>


    <h2>Store queries</h2>
    <p>Any store can be filtered by setting a query on the store.</p>

    <h3>Basic example</h3>
    <p>This query will filter so only items with <code>A</code> in the text will display:</p>
    <div class="bs-docs-example">
      <div class="dropdown clearfix">
        <ul data-dojo-type="havok/widget/Dropdown"
            data-dojo-props="
              query: {text: /^.*A.*$/},
              store: {
                  data: [
                      {id: 0, text: 'Action'},
                      {id: 1, text: 'Another Action'},
                      {id: 2, text: 'Something else here'},
                      {id: 3, type: 'divider'},
                      {id: 4, text: 'Separated Link'}
                  ]
              }
            "
            style="display: block; position: static; margin-bottom: 5px; *width: 180px;"
        >
        </ul>
      </div>
    </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
    data-dojo-props=&quot;
      query: {text: /^.*A.*$/},
      store: {
          data: [
              {id: 0, text: 'Action'},
              {id: 1, text: 'Another Action'},
              {id: 2, text: 'Something else here'},
              {id: 3, type: 'divider'},
              {id: 4, text: 'Separated Link'}
          ]
      }
    &quot;
&gt;
&lt;/ul&gt;
</pre>

    <h3>Queries on an implicit store</h3>
    <p>Implicitly created stores don't have <code>text</code> or other properties set on the store item. Therefore queries on an implicit store will need to pass a query function on the <code>node</code> property. Eg:</p>
    <div class="bs-docs-example">

      <div class="dropdown clearfix">
        <ul data-dojo-type="havok/widget/Dropdown"
          data-dojo-props="
              query: {node: {test: function(node){
                  return !!node && !!node.firstElementChild && /^.*A.*$/.test(node.firstElementChild.innerHTML);
              }}}
          "
          style="display: block; position: static; margin-bottom: 5px; *width: 180px;"
        >
          <li><a href="">Action</a></li>
          <li><a href="">Another action</a></li>
          <li><a href="">Something else here</a></li>
          <hr />
          <li><a href="">Separated link</a></li>
        </ul>
      </div>
    </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
  data-dojo-props=&quot;
      query: {node: {test: function(node){
          return !!node && !!node.firstElementChild &amp;&amp; /^.*A.*$/.test(node.firstElementChild.innerHTML);
      }}}
  &quot;
&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;br /&gt;
  &lt;li&gt;&lt;a href=&quot;&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

         <h2>Store query options</h2>

          <p>Query options can be set to control <code>start</code> <code>count</code> and <code>sort</code>. Eg:</p>
          <div class="bs-docs-example">
            <div class="dropdown clearfix">
              <ul data-dojo-type="havok/widget/Dropdown"
                  data-dojo-props="
                    queryOptions: {
                        start: 1,
                        count: 3,
                        sort: [{attribute: 'text', descending: true}]
                    },
                    store: {
                        data: [
                            {id: 0, text: '0'},
                            {id: 1, text: '1'},
                            {id: 2, text: '2'},
                            {id: 3, text: '3'},
                            {id: 4, text: '4'},
                            {id: 5, text: '5'},
                            {id: 6, text: '6'}
                        ]
                    }
                  "
                style="display: block; position: static; margin-bottom: 5px; *width: 180px;"
              >
              </ul>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;ul data-dojo-type=&quot;havok/widget/Dropdown&quot;
    data-dojo-props=&quot;
      queryOptions: {
          start: 1,
          count: 3,
          sort: [{attribute: 'text', descending: true}]
      },
      store: {
          data: [
              {id: 0, text: '0'},
              {id: 1, text: '1'},
              {id: 2, text: '2'},
              {id: 3, text: '3'},
              {id: 4, text: '4'},
              {id: 5, text: '5'},
              {id: 6, text: '6'}
          ]
      }
    &quot;
&gt;
&lt;/ul&gt;
</pre>

</section>
