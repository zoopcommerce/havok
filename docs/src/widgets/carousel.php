
        <section id="carousel" title="Carousel">
          <div class="page-header">
            <h1>Carousel</h1>
          </div>

          <p>Simply use <code>havok/widget/Carousel</code>. Eg:</p>

          <div class="bs-docs-example">
            <carousel>
                <img class="active" alt="" src="img/carousel-01.jpg">
                <img alt="" src="img/carousel-02.jpg">
                <img alt="" src="img/carousel-03.jpg">
            </carousel>
          </div>
<!--
          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Carousel">
                <figure class="active">
                    <img alt="" src="img/carousel-01.jpg">
                    <figcaption>
                        <h4>First Thumbnail label</h4>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    </figcaption>
                </figure>
                <figure>
                    <img alt="" src="img/carousel-02.jpg">
                    <figcaption>
                        <h4>Second Thumbnail label</h4>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    </figcaption>
                </figure>
                <figure>
                    <img alt="" src="img/carousel-03.jpg">
                    <figcaption>
                        <h4>Third Thumbnail label</h4>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    </figcaption>
                </figure>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Carousel&quot;&gt;
    &lt;figure class=&quot;active&quot;&gt;
        &lt;img alt=&quot;&quot; src=&quot;img/carousel-01.jpg&quot;&gt;
        &lt;figcaption&gt;
            &lt;h4&gt;First Thumbnail label&lt;/h4&gt;
            &lt;p&gt;Cras justo odio ...&lt;/p&gt;
        &lt;/figcaption&gt;
    &lt;/figure&gt;
    &lt;figure&gt;
        &lt;img alt=&quot;&quot; src=&quot;img/carousel-02.jpg&quot;&gt;
        &lt;figcaption&gt;
            &lt;h4&gt;Second Thumbnail label&lt;/h4&gt;
            &lt;p&gt;Cras justo odio ...&lt;/p&gt;
        &lt;/figcaption&gt;
    &lt;/figure&gt;
    &lt;figure&gt;
        &lt;img alt=&quot;&quot; src=&quot;img/carousel-03.jpg&quot;&gt;
        &lt;figcaption&gt;
            &lt;h4&gt;Third Thumbnail label&lt;/h4&gt;
            &lt;p&gt;Cras justo odio ...&lt;/p&gt;
        &lt;/figcaption&gt;
    &lt;/figure&gt;
&lt;/div&gt;
</pre>

          <p>Example using a store:</p>

          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Carousel"
                data-dojo-props="
                active: 2,
                store: {
                    data: [
                        {id: 0, title: 'First Thumbnail label', caption: 'caption 1', src: 'img/carousel-01.jpg'},
                        {id: 1, title: 'Second Thumbnail label', caption: 'caption 2', src: 'img/carousel-02.jpg'},
                        {id: 2, title: 'Third Thumbnail label', caption: 'caption 3', src: 'img/carousel-03.jpg'}
                    ]
                }"
            ></div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Carousel&quot;
    data-dojo-props=&quot;
    active: 2,
    store: {
        data: [
            {id: 0, title: 'First Thumbnail label', caption: 'caption 1', src: 'img/carousel-01.jpg'},
            {id: 1, title: 'Second Thumbnail label', caption: 'caption 2', src: 'img/carousel-02.jpg'},
            {id: 2, title: 'Third Thumbnail label', caption: 'caption 3', src: 'img/carousel-03.jpg'}
        ]
    }&quot;
&gt;&lt;/div&gt;
</pre>

          <p>Example with no captions, and linked images:</p>

          <div class="bs-docs-example">
            <div data-dojo-type="havok/widget/Carousel">
                <figure class="active">
                    <a href="#carousel"><img alt="" src="img/carousel-01.jpg"></a>
                </figure>
                <figure>
                    <a href="#carousel"><img alt="" src="img/carousel-02.jpg"></a>
                </figure>
                <figure>
                    <a href="#carousel"><img alt="" src="img/carousel-03.jpg"></a>
                </figure>
            </div>
          </div>
<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/widget/Carousel&quot;&gt;
    &lt;figure class=&quot;active&quot;&gt;
        &lt;a href=&quot;#carousel&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;img/carousel-01.jpg&quot;&gt;&lt;/a&gt;
    &lt;/figure&gt;
    &lt;figure&gt;
        &lt;a href=&quot;#carousel&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;img/carousel-02.jpg&quot;&gt;&lt;/a&gt;
    &lt;/figure&gt;
    &lt;figure&gt;
        &lt;a href=&quot;#carousel&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;img/carousel-03.jpg&quot;&gt;&lt;/a&gt;
    &lt;/figure&gt;
&lt;/div&gt;
</pre>
-->
        </section>
