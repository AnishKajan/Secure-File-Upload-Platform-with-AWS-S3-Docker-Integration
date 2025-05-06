document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
    const result = document.getElementById("uploadResult");
    const fileList = document.getElementById("fileList");
    const previewImage = document.getElementById("previewImage");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const file = form.querySelector('input[type="file"]').files[0];
      if (!file) return;
  
      try {
        const res = await fetch("/api/files/upload", {
          method: "POST",
          body: formData
        });
  
        const text = await res.text();
        if (res.ok) {
          const url = text.replace("File uploaded successfully: ", "").trim();
          result.innerHTML = `<p style="color:green">✅ ${text}</p>`;
          previewImage.src = url;
          previewImage.alt = file.name;
          loadFileList();
        } else {
          result.innerHTML = `<p style="color:red">❌ ${text}</p>`;
        }
      } catch (error) {
        result.innerHTML = `<p style="color:red">❌ Upload error: ${error.message}</p>`;
      }
    });
  
    async function loadFileList() {
      fileList.innerHTML = "Loading...";
      try {
        const res = await fetch("/api/files/list");
        const files = await res.json();
  
        fileList.innerHTML = "";
        files.forEach(url => {
          const fileName = decodeURIComponent(url.split("/").pop());
  
          const li = document.createElement("li");
  
          const link = document.createElement("a");
          link.href = "#";
          link.innerText = fileName;
          link.onclick = (e) => {
            e.preventDefault();
            previewImage.src = url;
            previewImage.alt = fileName;
          };
  
          const deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          deleteBtn.style.marginLeft = "10px";
          deleteBtn.style.color = "red";
          deleteBtn.onclick = async () => {
            if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;
  
            const delRes = await fetch(`/api/files/delete/${encodeURIComponent(fileName)}`, {
              method: "DELETE"
            });
  
            if (delRes.ok) {
              result.innerHTML = `<p style="color:orange">🗑️ Deleted: ${fileName}</p>`;
              previewImage.src = "";
              loadFileList();
            } else {
              result.innerHTML = `<p style="color:red">❌ Failed to delete ${fileName}</p>`;
            }
          };
  
          li.appendChild(link);
          li.appendChild(deleteBtn);
          fileList.appendChild(li);
        });
      } catch (err) {
        fileList.innerHTML = "<li>Error loading files</li>";
      }
    }
  
    loadFileList();
  });
  