/*
 * Name: Nikola Bojanic
 * Date: April 21, 2021
 * Section: CSE 154 AF
 *
 * This is the JS to implement the customization of song and track name
 * for my track player design, it also handles scaling of the design.
 * I hope to add more features but I may run out of time and have
 * to submit as is.
 */

"use strict";

(function() {

  window.addEventListener("load", init);

  // Constants to for scaling
  const INCREMENT = 0.1;
  const DECREMENT = -0.1;

  // Global variable needed to scale design proportionally
  let initialFontSize;

  // Counter needed to keep track of current customization menu page
  let currentPage = 0;

  // Counter needed to keep track of current background image
  let currentBackground = 0;

  // Current track time in seconds
  let currentTime = 53;

  // Total track length in seconds
  let totalTime = 231;

  // Ids of the possible customization menu pages
  const pageIds = [
    "song",
    "artist",
    "length",
    "current",
    "toggle-play",
    "next-bg",
    "upload-bg",
    "save"
  ];

  // Functions to generate the possible customization menu pages
  const generators = [
    () => generateInput(pageIds[0], "Song Name:", updateText),
    () => generateInput(pageIds[1], "Artist Name:", updateText),
    () => generateInput(pageIds[2], "Length (Seconds):", setLength),
    () => generateInput(pageIds[3], "Current (Seconds):", setTime),
    () => generateButton(() => toggleSelector("#play-controls"), "Toggle Play Controls"),
    () => generateButton(nextBackground, "Next Background"),
    () => generateFileInput("Upload Background", setCustomImage),
    () => generateButton(saveImage, "Save Image (Experimental)")
  ];

  // Default backgrounds
  const backgroundImages = [
    "img/background1.jpeg",   // Photo by Kevin Ianeselli on Unsplash
    "img/background2.jpeg",   // Photo by Joshua Fuller on Unsplash
    "img/background3.jpeg",   // Photo by Agnaldo Andrella on Unsplash
    "img/background4.jpeg",   // Photo by NASA on Unsplash
    "img/background5.jpeg"    // Photo by Gabriel on Unsplash
  ]

  /**
   * Initializes page/sets up event listeners
   */
  function init() {
    setUpScaling();
    document.body.addEventListener("click", backgroundClicked);
    id("page-btn").addEventListener("click", nextPage);
    generators[0]();
  }

  /**
   * Set up event listeners for buttons that scale design
   */
  function setUpScaling() {
    const html = document.documentElement;
    initialFontSize = window.getComputedStyle(html).getPropertyValue('font-size');
    initialFontSize = parseFloat(initialFontSize);
    id("grow").addEventListener("click", function() {
      scale(INCREMENT);
    });
    id("shrink").addEventListener("click", function() {
      scale(DECREMENT);
    });
  }

  /**
   * Removes current menu page and generates next
   */
  function nextPage() {
    const menuPage = id("menu-page");
    while (menuPage.hasChildNodes()) {
      menuPage.removeChild(menuPage.firstChild);
    }
    currentPage = (currentPage + 1) % pageIds.length;
    generators[currentPage]();
  }

  /**
   * Goes to next background image
  */
  function nextBackground() {
    currentBackground = (currentBackground + 1) % backgroundImages.length;
    const prop = "url('" + backgroundImages[currentBackground] + "')";
    document.body.style.backgroundImage = prop;
  }

  function saveImage() {
    toggleSelector(".menu-item");
    domtoimage.toBlob(document.body)
    .then(function (blob) {
        console.log(blob);
        saveAs(URL.createObjectURL(blob), "albumify");
    });
  }

  /**
   * Generates a menu input
   * @param {string} inputId - the id to give generated input
   * @param {string} labelText - what to label it
   * @param {Function} callback - the callback function
   */
  function generateInput(inputId, labelText, callback) {
    const menuPage = id("menu-page");
    // Set up label
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    menuPage.appendChild(label);

    // Set up input
    let input = document.createElement("input");
    input.id = inputId;
    input.addEventListener("input", callback);
    menuPage.appendChild(input);
  }

  /**
   * Generates a file input
   * @param {string} labelText - what to label it
   * @param {Function} callback - the callback function
   */
   function generateFileInput(labelText, callback) {
    const menuPage = id("menu-page");
    // Set up label
    let label = document.createElement("label");
    label.id = "file-label";
    label.textContent = labelText;
    // Set up input inside label
    let input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", callback);

    label.appendChild(input);
    menuPage.appendChild(label);
  }

  /**
   *
   */
  function setCustomImage() {
    if (this.files && this.files[0]) {
      const src = URL.createObjectURL(this.files[0]); // set src to blob url
      const prop = "url('" + src + "')";
      document.body.style.backgroundImage = prop;
    }
  }

  /**
   * Generates a menu button
   * @param {Function} buttonCallback - the callback function
   * @param {string} text - the button text
   */
   function generateButton(buttonCallback, text) {
    const menuPage = id("menu-page");
    let button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", buttonCallback);
    menuPage.appendChild(button);
  }

  /**
   * Callback to update length
   * @param {event} event - information about the input event
   */
  function setLength (event) {
    let seconds = parseInt(event.target.value);
    if (seconds > currentTime && seconds < 3600) {
      totalTime = seconds;
    }
    updateTimeDisplay();
  }

  /**
   * Callback to update time
   * @param {event} event - information about the input event
   */
  function setTime (event) {
    let seconds = parseInt(event.target.value);
    if (seconds <= totalTime && seconds < 3600) {
      currentTime = seconds;
    }
    updateTimeDisplay();
  }

  /**
   * Updates the seeking bar and timestamps visually
   */
  function updateTimeDisplay() {
    id("start").textContent = formatDisplayTime(currentTime);
    id("end").textContent = formatDisplayTime(totalTime);
    const filledPercent = (currentTime / totalTime * 100);
    const emptyPercent = 100 - filledPercent;
    console.log(filledPercent);
    console.log(emptyPercent);
    id("filled").style.width = `${Math.abs(filledPercent)}%`;
    id("empty").style.width = `${Math.abs(emptyPercent)}%`;
  }

  /**
   * Format pretty time
   * @param {number} totalSeconds - seconds to format as a time
   * @returns {string} time as MM:SS
   */
  function formatDisplayTime(totalSeconds) {
    const minutes = Math.floor((totalSeconds / 60));
    let seconds = Math.floor((totalSeconds % 60));
    if (seconds === 0) seconds = "00";
    if (seconds > 0 && seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  }

  /**
   * Updates text corresponding to given input
   * @param {event} event - information about input event
   */
  function updateText(event) {
    let inputId = event.target.id;
    let toUpdate;
    if (inputId === "song") {
      toUpdate = "song-name";
    } else {
      toUpdate = "artist-name";
    }
    id(toUpdate).textContent = event.target.value;
  }

  /**
   * Callback when HTML body clicked
   * @param {event} event - information about click event
   */
  function backgroundClicked(event) {
    if (event.target.closest(".menu-item") === null) {
      toggleSelector(".menu-item");
    }
  }

  /**
   * Show/hide menu items
   */
  function toggleSelector(s) {
    const elements = qsa(s);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hidden");
    }
  }

  /**
   *  Shifts rem based design by changing root font size
   * @param {number} percentChange - how much to scale by
   */
  function scale(percentChange) {
    const html = document.documentElement;
    const currentSize = window.getComputedStyle(html).getPropertyValue('font-size');
    let fontSize = parseFloat(currentSize);
    html.style.fontSize = fontSize + percentChange * initialFontSize + "px";
  }

  /**
   * Id shorthand
   * @param {string} idValue - id to find
   * @returns {Element} element
   */
  function id(idValue) {
    return document.getElementById(idValue);
  }

  /**
   * Qsa shorthand
   * @param {string} selector - selector to find
   * @returns {Element} element
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();