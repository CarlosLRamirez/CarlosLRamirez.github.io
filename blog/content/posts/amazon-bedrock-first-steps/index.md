---
title: Amazon Bedrock First Steps
date: 2025-12-08T14:34:00-06:00
draft: false
tags:
  - amazon-bedrock
  - hands-on-lab
  - ai
  - aws
  - english
categories:
  - AWS
  - AI
description: My first experience with Amazon Bedrock, experimenting with text and image generation using foundational models without writing code
cover:
  image: post-cover.webp
---

## Introduction

If, like me, you are taking your first steps with AWS services for Artificial Intelligence, either because you are preparing to take the AWS GenAI Practitioner certification or simply want to experiment with AI models without writing code, this guide is for you.

Here I show you my first experience with Amazon Bedrock, where I experimented with generating text and images using some of the available foundational models.

## What is Amazon Bedrock

Amazon Bedrock is a fully managed service by AWS that you can use to build Generative Artificial Intelligence applications. It provides access to different AI foundational models from the most important providers, allowing you to evaluate and customize the models to your needs, without worrying about the infrastructure behind them.

## Guide from Scratch (Step-by-Step)

### Step 1: Access Amazon Bedrock in the AWS console and list the available models

- I searched for the Amazon Bedrock service in the AWS console,

![AWS Console Search](Pasted%20image%2020251208160123.png)

- And it opened the main service console

![Bedrock Console](Pasted%20image%2020251208160241.png)

- In the Amazon Bedrock console, I looked for Model Catalog, here is where you can see all the Foundation Models available in Bedrock, classified by Provider, Modality, among others.

![Model Catalog](Pasted%20image%2020251208161224.png)

- By selecting one of the models, you can see all the details of that model

![Model Details](Pasted%20image%2020251208165442.png)

> **Note:** **Surprise:** It turns out that to use Anthropic models, we first have to prove we are not a bot!
> ![Anthropic Verification](Pasted%20image%2020251208163809.png)
> See below on how to meet this pre-requisite.

### Step 2: Test Amazon text models

- To test a model in text or chat mode, I went to Test > Chat/Text Playground

![Text Playground](Pasted%20image%2020251208165639.png)

- Then I selected where it said Single Prompt (instead of Chat)

![Single Prompt](Pasted%20image%2020251208165817.png)

- and then the select model button

![Select Model](Pasted%20image%2020251208165922.png)

- Here I selected the **Amazon Micro** model from Amazon.

![Amazon Micro Model](Pasted%20image%2020251208213651.png)

- Leaving all the default settings, I wrote the following prompt: *"Explain quantum computing to a 10-year-old, then write a haiku about it."*, this was the result

```md
Sure! Let's start with an explanation that a 10-year-old can understand:

**Quantum Computing for Kids**

Imagine you have a really special kind of toy that can do many things at once. Normally, when you play with your toys, they can either be on or off, like a light switch. But with this special toy, it can be both on and off at the same time! This special toy is like a tiny, magical computer called a "quantum computer."

Quantum computers use tiny particles called "qubits" that can be both 0 and 1 at the same time. This lets them do many calculations all at once, which makes them super fast and powerful for solving really hard puzzles that normal computers can't solve easily.

Now, here's a haiku about quantum computing:

**Quantum Magic**
Tiny bits that dance and spin,
Super-fast, they solve the win,
Quantum's magic spin.
```

![Amazon Model Response](Pasted%20image%2020251209060453.png)

- I could also see relevant information such as the number of input and output tokens, as well as the latency, which is the time the foundation model took to generate each token.

![Token Metrics](Pasted%20image%2020251209060843.png)

- There are additional configurations available that can be modified to obtain a more customized or specific result.

![Model Configuration](Pasted%20image%2020251209061047.png)

### Step 3: Test an Anthropic Model

- As we saw earlier, to use models from the company Anthropic, such as Claude Sonet 4.5, the first time you need to fill out a form specifying the use case for which you need access to their modules, as well as your company's data and website URL.

![Anthropic Form](Pasted%20image%2020251209062312.png)

- I completed the form with my name and the URL of my personal site. In the use case, I described that I would use it for experimentation and testing, making sure to include an estimate of the usage volume (tokens per month) and the time I planned to use it (for this I relied on the AI itself 😃). With this, it immediately allowed me to continue and was ready to place the prompt.

- I used the same prompt as in the previous model and the results were as follows.

![Claude Response](Pasted%20image%2020251209063254.png)

- I could notice that with this model, a certain format is applied to the text, and as expected, the text is different, although in both cases they make sense in relation to the question asked.

```md
# Quantum Computing for a 10-Year-Old

Imagine you're in a huge maze trying to find the exit. A regular computer is like one person walking through the maze, trying one path at a time until they find the way out.

A quantum computer is like magic! It's as if you could walk down ALL the paths at the same time, then pick the right one. That's because quantum computers use special bits called "qubits" that can be both 0 AND 1 at the same time (regular computer bits can only be 0 OR 1).

It's like if your toy could be both in your toy box and under your bed at the exact same time - until you look at it, then it picks one place to be. Quantum computers use this weird trick to solve really hard problems super fast!

---

## Haiku

_Bits dance in between_
_Zero and one, both at once_
_All paths walked as one_
```

- These were the metrics for the Claude Sonnet 4.5 model. As you can see, this model behaves differently from the previous one.

![Claude Metrics](Pasted%20image%2020251209063733.png)

- One difference with the previous model is that this one allows you to add files to the prompt

![File Upload Option](Pasted%20image%2020251209064527.png)

- Regarding the model configuration parameters, I noticed they are slightly different from Amazon's. For example, there is an option to add reasoning:

![Reasoning Option](Pasted%20image%2020251209063952.png)

- Also, the maximum number of tokens is greater, and the options for randomness and diversity are configured differently.

![Claude Configuration](Pasted%20image%2020251209064138.png)

### Step 4: Test an image model

- Next, I tested image generation. For this, I returned to the main Amazon Bedrock console and selected Test > Image / Video playground

![Image Playground](Pasted%20image%2020251209064929.png)

- First I selected the model

![Select Image Model](Pasted%20image%2020251209065011.png)

- Only Amazon models appeared for me, and in this case, I used the Nova Canvas 1.0 model

![Nova Canvas Model](Pasted%20image%2020251209065216.png)

- Just like with the other text models, here we also have different configurable parameters such as image size, quantity, color palette, and other more advanced parameters that I don't understand at the moment.

![Image Parameters](Pasted%20image%2020251209065409.png)

- I wrote the following prompt to experiment with the model: *"Show me a person studying for the AWS GenAI practitioner exam on a library with other students."*,

![Generated Image](Pasted%20image%2020251209182747.png)

- The result was quite decent. Although it didn't generate anything that referred to AWS or the GenAI practitioner exam, the scenes were consistent with what the prompt indicated.
- The image was generated in a matter of seconds; however, I couldn't find exact metrics on tokens or latency.

## Results and Conclusions

- I was able to experiment with Amazon Bedrock's basic functions for testing text and image generation models, as well as see the number of foundational models it offers from various providers.
- I also managed to use Anthropic models, for which I had to fulfill a simple prerequisite consisting of filling out a small form.
- Amazon Bedrock serves as a centralized place where we can access different foundational models. Its interface is intuitive, ideal for beginners.
- To use Anthropic models from Amazon Bedrock, there is an easy-to-meet pre-requisite.
