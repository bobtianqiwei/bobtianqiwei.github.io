// content/projects/palette-plate.js developed by Bob Tianqi Wei
module.exports = {
  slug: "palette-plate",
  content: {
    title: "Palette Plate",
    description: "An AI-assisted plating system that combines camera input, projection, and food-aware generation to help chefs explore presentation ideas in real time.",
    hero: {
      headline: "A kitchen-side system that turns plate analysis, image generation, and projection into a practical aid for plating decisions.",
      metaLines: [
        "Bob Tianqi Wei, Stephanie Wang, Cen Yang",
        "Group Project · UC Berkeley",
        "Advisor: Pierluigi Dalla Rosa",
        "2024"
      ],
      image: "/images/palette-plate.jpg"
    },
    sections: [
      {
        title: "Overview",
        video: {
          src: "https://www.youtube.com/embed/ccidwJts8Kk?si=5cNlFOhh3XXkBYcH",
          title: "Palette Plate demo",
          caption: "Demo"
        },
        bodyHtml: "<p>Palette Plate is an AI-assisted plating concept that combines a Raspberry Pi, camera, projector, food recognition, and image generation. Instead of treating plating as something chefs can only perfect through repeated manual trial and error, the system reframes it as an interactive conversation between ingredients, surface constraints, and visual inspiration.</p><p>The project is compelling because it turns AI into a spatial design assistant rather than a detached recommendation engine. It measures the physical plate, recognizes food context, generates possible presentations, and projects guidance directly into the workspace where plating decisions happen.</p>"
      },
      {
        title: "Why It Is Interesting",
        bodyHtml: "<p>The strongest idea in Palette Plate is that culinary presentation is both aesthetic and deeply physical. The system does not stop at generating pretty references. It connects image generation with the actual geometry of the plate and kitchen surface, helping chefs think with the real constraints in front of them.</p><p>That makes the project richer than a novelty AI demo. It explores how multimodal systems can support creative work where measurement, composition, timing, and sustainability all matter at once.</p>"
      },
      {
        title: "User and Value Proposition",
        bodyHtml: "<p>Palette Plate was framed around chefs and culinary learners who need more than static examples. It supports experimentation by offering inspiration, precise measurement, and projected boundaries that reduce repeated wasteful trials. The system also points toward more sustainable workflows by helping users do more with fewer plates and clearer spatial planning.</p><p>In that sense, the project sits between creativity support and practical kitchen tooling. It tries to make sophisticated plating easier without flattening the chef's judgment.</p>"
      },
      {
        title: "System Workflow",
        bodyHtml: "<p>The prototype captures a view of the food setup, identifies food items and plate boundaries, generates candidate plating imagery, and projects guidance back into the kitchen space. This workflow required connecting computer vision, external AI services, and physical calibration so the generated reference could align with real surfaces.</p><p>What makes the engineering interesting is the combination of heterogeneous tools: OpenCV for camera capture, food analysis APIs, image generation, YOLO-based plate localization, and a projection setup that translates digital suggestions into physical placement cues.</p>",
        figures: [
          {
            src: "/images/palette-plate.jpg",
            caption: "Palette Plate combines plate detection, food analysis, generative references, and projected spatial guidance."
          }
        ]
      },
      {
        title: "Source Code & System Map",
        bodyHtml: "<p>The old project page included several embedded code panels showing how the system moved from webcam capture to food analysis, empty-plate detection, and projection alignment. I restored those as lightweight local code excerpts instead of relying on the previous external embed styling.</p>",
        codeBlocks: [
          {
            title: "Image Generation Pipeline",
            language: "Python",
            code: `# PALETTE PLATE by Bob Tianqi Wei, Stephanie Wang, Cen Yang
import cv2
import requests
from PIL import Image
import io
import os

def generate_image(prompt):
    headers = {
        "Authorization": "Bearer **************",
        "Content-Type": "application/json",
    }
    data = {
        "prompt": prompt,
        "n": 1,
        "size": "512x512",
    }
    response = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers=headers,
        json=data,
    )
    return response.json()

cap = cv2.VideoCapture(0)
ret, frame = cap.read()
cv2.imwrite("captured_image.jpg", frame)
cap.release()`,
            caption: "Excerpt from the camera capture and image-generation stage shown on the original project page."
          },
          {
            title: "Plate Detection",
            language: "Python",
            code: `import cv2
import numpy as np
from ultralytics import YOLOWorld

model = YOLOWorld("yolov8s-worldv2.pt")
model.set_classes(["bowl"])

image_path_1 = "captured_image.jpg"
results = model.predict(image_path_1)

for box in results[0].boxes:
    bounding_box = box.xyxy[0]
    xmin = bounding_box[0].item()
    ymin = bounding_box[1].item()
    xmax = bounding_box[2].item()
    ymax = bounding_box[3].item()

with open("bounding_box_coordinates.txt", "w") as file:
    file.write(f"{xmin},{ymin},{xmax},{ymax}")`,
            caption: "Excerpt from the YOLO-based empty-plate localization logic shown on the original page."
          },
          {
            title: "Cropping and Projection Alignment",
            language: "Python",
            code: `from ultralytics import YOLOWorld
import cv2
import numpy as np

model = YOLOWorld("yolov8s-worldv2.pt")
model.set_classes(["bowl"])

image_path = "path/to/save/image.jpg"
results = model.predict(image_path)

bounding_box = results[0].boxes[0].xyxy[0]
xmin = bounding_box[0].item()
ymin = bounding_box[1].item()
xmax = bounding_box[2].item()
ymax = bounding_box[3].item()

original_image = cv2.imread(image_path)
cropped_image = original_image[int(ymin):int(ymax), int(xmin):int(xmax)]
cv2.imwrite("path/to/save/cropped_image.jpg", cropped_image)`,
            caption: "Excerpt from the crop-and-align step used to prepare images for projection."
          }
        ]
      },
      {
        title: "Project Links",
        bodyHtml: "<p>No public repository is linked on the current project page.</p>"
      }
    ]
  },
  views: {}
};
