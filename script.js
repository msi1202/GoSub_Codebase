document.addEventListener("DOMContentLoaded", () => {
    // Mobile Nav Toggle
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");
    if (navToggle && navbar) {
      navToggle.addEventListener("click", () => {
        navbar.classList.toggle("open");
      });
    }
  
    // Example Sublease Data
    const subleases = [
      {
        id: 1,
        title: "Modern Studio near UCLA",
        location: "Los Angeles",
        price: "$1200/mo",
        heroImg: "https://images.pexels.com/photos/7579225/pexels-photo-7579225.jpeg?auto=compress&cs=tinysrgb&w=1600",
        cardImg: "https://images.pexels.com/photos/7579225/pexels-photo-7579225.jpeg?auto=compress&cs=tinysrgb&w=400",
        desc: "Bright, open studio with in-building laundry. Perfect for interns.",
        details: "Furnished, near campus transit. Available June - August."
      },
      {
        id: 2,
        title: "Shared 2BR near NYU",
        location: "New York",
        price: "$900/mo",
        heroImg: "https://images.pexels.com/photos/5513269/pexels-photo-5513269.jpeg?auto=compress&cs=tinysrgb&w=1600",
        cardImg: "https://images.pexels.com/photos/5513269/pexels-photo-5513269.jpeg?auto=compress&cs=tinysrgb&w=400",
        desc: "Cozy shared apartment with updated kitchen and flexible dates.",
        details: "Includes WiFi & utilities. 5-minute walk to campus. Available May - Dec."
      },
      {
        id: 3,
        title: "1BR Loft near USC",
        location: "Los Angeles",
        price: "$1400/mo",
        heroImg: "https://images.pexels.com/photos/6899293/pexels-photo-6899293.jpeg?auto=compress&cs=tinysrgb&w=1600",
        cardImg: "https://images.pexels.com/photos/6899293/pexels-photo-6899293.jpeg?auto=compress&cs=tinysrgb&w=400",
        desc: "Spacious loft with big windows and secure parking.",
        details: "Quiet neighborhood. Available June - October."
      }
    ];
  
    // Listings Page: Render listing cards dynamically
    const listingGrid = document.getElementById("listingGrid");
    if (listingGrid) {
      function renderListings(data) {
        listingGrid.innerHTML = "";
        data.forEach(sub => {
          const card = document.createElement("div");
          card.className = "listing-card";
          card.innerHTML = `
            <img src="${sub.cardImg}" alt="${sub.title}" />
            <div class="listing-card-content">
              <h3>${sub.title}</h3>
              <p>${sub.location} – ${sub.price}</p>
              <p>${sub.desc}</p>
            </div>
          `;
          card.addEventListener("click", () => {
            localStorage.setItem("gosubDetail", JSON.stringify(sub));
            window.location.href = "detail.html";
          });
          listingGrid.appendChild(card);
        });
      }
      renderListings(subleases);
  
      // Filter Listings
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = subleases.filter(s =>
          s.title.toLowerCase().includes(val) ||
          s.location.toLowerCase().includes(val) ||
          s.desc.toLowerCase().includes(val)
        );
        renderListings(filtered);
      });
    }
  
    // Detail Page: Load selected listing details
    const detailHero = document.getElementById("detailHero");
    const detailHeroContent = document.getElementById("detailHeroContent");
    const detailInfo = document.getElementById("detailInfo");
    if (detailHero && detailHeroContent && detailInfo) {
      const stored = localStorage.getItem("gosubDetail");
      let detailObj = subleases[0];
      if (stored) {
        detailObj = JSON.parse(stored);
      }
      detailHero.style.background = `url('${detailObj.heroImg}') center center/cover no-repeat fixed`;
      detailHeroContent.innerHTML = `
        <h1>${detailObj.title}</h1>
        <p>${detailObj.location} – ${detailObj.price}</p>
      `;
      detailInfo.innerHTML = `
        <p>${detailObj.desc}</p>
        <p><strong>Details:</strong> ${detailObj.details}</p>
        <div class="detail-actions">
          <a href="login.html">Contact Subleaser</a>
          <a href="login.html">Apply Now</a>
        </div>
      `;
    }
  });
  