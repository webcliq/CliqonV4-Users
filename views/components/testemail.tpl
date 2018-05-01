<!-- Testemail.Tpl  -->
<h2 class="">Email Diagnostics</h2>

<form class="form" id="dataform">

    <label for="mailtoname" class="sr-only">Mail to name</label>
    <input type="text" class="form-control mb10" placeholder="Mail to name" required autofocus v-model="row.mailtoname">

    <label for="mailto" class="sr-only">Mail to address</label>
    <input type="email" class="form-control mb10" placeholder="Mail to address" required v-model="row.mailto">

    <label for="mailreplytoname" class="sr-only">Site name</label>
    <input type="text" class="form-control mb10" placeholder="Site name" required v-model="row.mailreplytoname">

    <label for="mailreplyto" class="sr-only">Site address</label>
    <input type="email" class="form-control mb10" placeholder="Site address" required v-model="row.mailreplyto">

    <label for="subject" class="sr-only">Subject</label>
    <input type="text" class="form-control mb10" placeholder="subject" required v-model="row.subject">

    <label for="message" class="sr-only">Message</label>
    <textarea class="form-control mb10" placeholder="contents of message" required v-model="row.message"></textarea>

    <button class="btn btn-primary btn-block" v-on:click="sendbutton" type="button">Send</button>

</form>

<pre id="resultblock">

</pre>