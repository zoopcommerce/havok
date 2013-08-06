
        <section id="sortable" title="Sortable">
          <div class="page-header">
            <h1>Sortable</h1>
          </div>

            <p><code>havok/dnd/_SortableMixin</code> makes list type elements sortable by drag n drop.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">

            <ul class="nav-stacked"
                data-dojo-type="havok/widget/NavTab"
                data-dojo-mixins="havok/widget/_SortableMixin"
                data-dojo-props="store: {
                    idProperty: 'text',
                    data: [
                        {text: 'ACT'},
                        {text: 'NSW'},
                        {text: 'Vic'},
                        {text: 'Qld'},
                        {text: 'SA'},
                        {text: 'NT'},
                        {text: 'WA'},
                        {text: 'Tas'}
                    ]
                }"
            >
            </ul>

          </div>

<pre class="prettyprint linenums">
&lt;ul class=&quot;nav-stacked&quot;
    data-dojo-type=&quot;havok/widget/NavTab&quot;
    data-dojo-mixins=&quot;havok/widget/_SortableMixin&quot;
    data-dojo-props=&quot;store: {
        idProperty: 'text',
        data: [
            {text: 'ACT'},
            {text: 'NSW'},
            {text: 'Vic'},
            {text: 'Qld'},
            {text: 'SA'},
            {text: 'NT'},
            {text: 'WA'},
            {text: 'Tas'}
        ]
    }&quot;
&gt;
&lt;/ul&gt;
</pre>

          <h2>Sort between lists</h2>

          <p>Use the <code>dropTargets</code> property to allow sorting between lists.</p>
          <div class="bs-docs-example">

              <div class="row-fluid">
            <ul class="span6 nav-stacked"
                id="leftSortable"
                data-dojo-type="havok/widget/NavTab"
                data-dojo-mixins="havok/widget/_SortableMixin"
                data-dojo-props="dropTargets: ['this', 'rightSortable']"
            >
                <li><a>Harry</a></li>
                <li><a>Max</a></li>
                <li><a>Phillip</a></li>
                <li><a>James</a></li>
            </ul>
            <ul class="span6 nav-stacked"
                id="rightSortable"
                data-dojo-type="havok/widget/NavTab"
                data-dojo-mixins="havok/widget/_SortableMixin"
                data-dojo-props="dropTargets: ['this', 'leftSortable']"
            >
                <li><a>Michael</a></li>
                <li><a>Tim</a></li>
                <li><a>Shaun</a></li>
                <li><a>Robert</a></li>
            </ul>
              </div>
          </div>

<pre class="prettyprint linenums">
&lt;ul class=&quot;span6 nav-stacked&quot;
    id=&quot;leftSortable&quot;
    data-dojo-type=&quot;havok/widget/NavTab&quot;
    data-dojo-mixins=&quot;havok/widget/_SortableMixin&quot;
    data-dojo-props=&quot;dropTargets: ['this', 'rightSortable']&quot;
&gt;
    &lt;li&gt;&lt;a&gt;Harry&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Max&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Phillip&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;James&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;ul class=&quot;span6 nav-stacked&quot;
    id=&quot;rightSortable&quot;
    data-dojo-type=&quot;havok/widget/NavTab&quot;
    data-dojo-mixins=&quot;havok/widget/_SortableMixin&quot;
    data-dojo-props=&quot;dropTargets: ['this', 'leftSortable']&quot;
&gt;
    &lt;li&gt;&lt;a&gt;Michael&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Tim&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Shaun&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a&gt;Robert&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>

          <h2>Horizontal example</h2>

          <div class="bs-docs-example">

            <ul data-dojo-type="havok/widget/NavPill"
                data-dojo-mixins="havok/widget/_SortableMixin"
            >
                <li><a>Tiny</a></li>
                <li><a>Small</a></li>
                <li><a>Medium</a></li>
                <li><a>Big</a></li>
                <li><a>Biggest</a></li>
            </ul>

          </div>

          <h2>Tabs example</h2>

          <p>Tabs in a <code>havok/widget/TabContainer</code> are sortable by default.</p>

          <div class="bs-docs-example">

            <div data-dojo-type="havok/widget/TabContainer"
                 style="margin-bottom: 18px;">
                <div title="Section 1" class="active">
                  <p>I'm in Section 1.</p>
                </div>
                <div title="Section 2">
                  <p>Howdy, I'm in Section 2.</p>
                </div>
                <div title="Section 3">
                  <p>What up girl, this is Section 3.</p>
                </div>
            </div>
          </div>

<pre class="prettyprint linenums">

</pre>

        </section>
