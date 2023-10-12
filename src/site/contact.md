---
title: Contact
heading: Say hello
intro: |
    If you'd like to brainstorm collaborations, want me to talk at your event (expert or general public) or you're looking for someone to supervise your thesis work, say hello!
layout: default
permalink: contact.html
---

Email me at [sarah.lindner@uni-graz.at](mailto:{{ site.author.email }}). I'll get back to you as soon as I can.

I'd love to meet you in person. If you are in Graz, find me in my [office]({{site.adress.room.url}}) or my [lab]({{site.adress.lab.url}}) on regular workdays (except Fridays). Here is my university [contact card]({{site.author.card}}) and this is my work address:

<address class="bg-base-200 font-semibold p-2 md:p-4 lg:p-6 rounded-md w-fit">
    <span class="org">{{site.author.name}}</span>
    <br>
    <span class="org">{{site.adress.name}}</span>
    <br>
    <span class="street-address">{{site.adress.street}}</span>
    <br>
    <span class="locality">{{site.adress.city}}</span>
    <span class="country-name">{{site.adress.country}}</span>
</address>

<a class="inline-flex gap-x-4" href="{{ site.author.linkedin }}">
{%- include "svg/LinkedIn.svg" -%}
    Let's connect on LinkedIn
</a>
