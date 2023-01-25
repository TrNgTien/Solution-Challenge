import keras_ocr
import matplotlib.pyplot as plt

pipeline = keras_ocr.pipeline.Pipeline()
images = [
    keras_ocr.tools.read(img) for img in ['./images/mcocr_public_145013aukcu.jpg', './images/mcocr_public_145013auohz.jpg']
]
prediction_groups = pipeline.recognize(images)
predicted_image = prediction_groups[0]
for text, box in predicted_image:
    print(text)
fig, axs = plt.subplots(nrows=len(images), figsize=(10, 20))
for ax, image, predictions in zip(axs, images, prediction_groups):
    keras_ocr.tools.drawAnnotations(image=image, 
                                    predictions=predictions, 
                                    ax=ax)

plt.show()
import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))