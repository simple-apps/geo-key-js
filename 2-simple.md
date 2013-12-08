---
layout: page
title: მარტივი მაგალითი
description: ელემენტები
group: navigation
---
{% include JB/setup %}

ამ გვერდზე განიხილება მარტივი მაგალითები სხვადასხვა ელემენტებზე მუშაობისას.

<br />

ვთქვათ გვსურს ყველა არსებული ბეჭდვადი ელემენტი გავხადოთ ```GeoKey.JS```-ს ზემოქმედების ქვეშ და ასევე მომხმარებელს მივცეთ უფლება ისარგებლოს ~ ღილაკით მოქმედების შესაცვლელად. არ გვსურს არც ინდიკატორი და არც ```CHECKBOX```-ის ტიპის პლაგინი.

ასეთ შემთხვევაში, საჭიროა ```HEAD``` ელემენტში ჩავსვათ ```geokey.js``` და ```geokey.hotkey.js```

{% highlight html %}
<script type="text/javascript" src="../path/geokey.js"></script>
<script type="text/javascript" src="../path/geokey.hotkey.js"></script>
{% endhighlight %}

ხოლო ```BODY``` ელემენტის დასრულებამდე ბიბლიოთეკის ინიციალიზაციის სკრიპტი

{% highlight html %}
<script type="text/javascript">
// ფუნქციის კონსტრუქტორის ინციალიზაცია
new GeoKey({
  target: '', // სამიზნე ელემენტები. სიცარიელის შემთხვევაში ყველა.
  work: 'yes', // თავიდანვე იმოქმედოს (ქართულად ბეჭდოს) თუ არა.
  hotkey: 'yes' // გამოიყენოს ~ ღილაკი მოქმედების შესაცვლელად თუ არა.
});
</script>
{% endhighlight %}

```IFRAME``` ელემენტის დინამიური ცვლილებისთვის, საჭიროა მისი დიზაინის მოდიფიკაციაში გადაყვანა

{% highlight html %}
<script type="text/javascript">
  document.getElementById('myIframeId').contentWindow.document.designMode = 'on';
</script>
{% endhighlight %}

<hr />

### INPUT\[TYPE=TEXT\]

{% highlight html %}
<input type="text" />
{% endhighlight %}


<input type="text" />

<hr />

### TEXTAREA

{% highlight html %}
<textarea></textarea>
{% endhighlight %}

<textarea style="resize:none;">
</textarea>

<hr />

### DIV\[CONTENTEDITABLE\]

{% highlight html %}
<div contenteditable="true"></div>
{% endhighlight %}

<div class="well" contenteditable="true">
</div>

<hr />

### IFRAME

{% highlight html %}
<iframe id="myId"></iframe>
<script type="text/javascript">
  document.getElementById('myId').contentWindow.document.designMode = 'on';
</script>
{% endhighlight %}

<iframe id="demo-iframe" style="width:210px;">
</iframe>

<script type="text/javascript">
  document.getElementById('demo-iframe').contentWindow.document.designMode = 'on';
  
	new GeoKey({
	  target: '',
    work: 'yes',
    hotkey: 'yes'
	});
</script>