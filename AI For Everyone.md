# AI For Everyone

## What is AI?
### Vid 1: Introduction
- AI value creation
    - $13-22 trillion by 2033 McKinsey
    - more value from supervised learning than from generative AI
    - lots of value outside software industry
        - retail, travel, transport & logistics etc
        - hairdressing is an example of a job that will be least affected by AI
- Demysitfying AI
    - AI comprises separate ideas
        - ANI - artificial narrow intelligence
            - smart speaker, self-driving car, web search, AI farms and factories
            - one-trick pony but valuable
        - Generative AI
            - Bard, ChatGPT, DALL-E, Midjourney
            - more general purpose
        - AGI - Artificial General Intelligence
            - can do any intellectual task
            - do anything a human can (or more!)
- ANI and Gen Ai - lots of progress
- very far from AGI - not even close but making tiny baby steps in research settings
    - decades or hundreds of years & multiple technological breakthroughs
- in this week, we look at ANI
#### What we will learn
- What is AI
    - What is machine learning?
    - Data, types of valuable and nonvaluable data
    - What makes a company an AI company or AI-first company?
    - What ML can and can't do
    - we'll look at some failures of ML and AI
    - Optional: Intuitive explanation of Deep Learning (neural networks)
        - what can they do especially for ANI tasks
- Week two: Building AI projects
- Week three: Building AI in your company
    - AI transformation playbook
    - build AI teams 
    - build complex AI products
- Week four: AI and society
    - bias of AI
    - diminish bias
    - AI and developing economies and jobs
    - navigate rise of AI

### Vid 2: Machine Learning
- supervised learning
    - most commonly used type
    - input to output mappings (A->B) 
- examples
    - spam filter
        - input A is email
        - output B is "is this email spam or not?" (returns 0 or 1, yes or no, true or false)
    - speech recognition
        - input is audio
        - output is text transcript
    - machine translation  
        - English
        - Chinese (other lang)
    - online advertising
        - input ad, user info
        - will user click? (0/1)
        - big economic impact and already used 
    - self-driving car
        - image, radar info
        - position of other cars  
    - visual inspection (manufacturing for example)
        - image of a something manufactured, eg phone
        - is there a defect, scratch, dent on this manufactured item? (0/1)
    - chatbot, LLM
        - sequence of words input
        - the next word (output)

#### How LLMs Work
- built using supervised learning (A->B) to predict next word
- imagine an LLM reads on the internet: "My favorite drink is lychee bubble tea."

|Input (A)                  | Output (B)|
|---                        | ---       |
| My favorite drink         |    is      |
| My favorite drink is      | lychee    |
| My favorite drink is lychee | bubble |
| My favorite drink is lychee bubble | tea |

- a large AI system trained on hundreds of billions of words, we get an LLM like ChatGPT

- summary - supervised learning learns input to output mappings (A->B)
- been around for decades
- why is supervised learning taking off now?
    - imagine a graph where we plot performance of AI on the Y axis and amount of data on the X axis
    - amount of data has grown in recent decades
    - in traditional AI, as you feed more data, performance increases quickly initially but soon plateaus
    - neural networks and deep learning has meant AI has taken off in the last few 
<image src="src/assets/whynow.png"/>

- bigger neural nets provide better/more acceptable quality of output for users
- large nets require a lot of data
    - ie Big Data
- fast computers, specialized GPUs enable many companies to train large neural nets on enough data to get good performance and create products

### Vid 3: What is Data?
- example of table of data (aka **dataset**)
- pricing houses for purchase or sale
<image src="./src/assets/house-data.png">
- **Importance of Data**: Data is crucial for building AI systems.
- **Defining Data**: Data can be structured like a table or spreadsheet; an example is a dataset for house pricing, with columns for size and price.
- **AI System Learning**: AI can learn the relationship (mapping) between input (A) and output (B), such as house size and price.
- **Adjusting Inputs and Outputs**: Inputs (A) can include multiple factors like size and number of bedrooms, while output (B) remains the price.
<image src="./src/assets/no-of-bedroom.png">
- **Business Use Case**: It's essential to define inputs and outputs based on business needs.
- **Example Variations**: For budget planning, A could be spending and B the house size.
    - in this case, given a budget, the model tells you what size house you might be looking for
- **Image Recognition Example**: An AI system can identify cats in images, where A is the images and B the labels (cat or not).
<image src="./src/assets/image-recognition.png">

- **Historical Note**: Use of cats in machine learning was popularized by Google's AI research.
- **Data Acquisition Methods**:
  - **Manual Labeling**: Labeling data manually, e.g., tagging images as cat or not.
    - by manually labeling, you have a dataset to create a cat detector
    - might need hundreds of thousands of pictures
    - manual labeling is tried and true method to get dataset
  - **Observing Behaviors**: Collecting data from user actions or machine operations.
    - example, you run online shop, you offer items at different prices
    - observe if users buys them or not
    <image src="./src/assets/buying-not.png"/>
    - the users generate the data
    - example, observe machines in factory, will it fail? (preventative maintenance)

<image src="./src/assets/fail.png"/>


- machine, temp, and psi are input A 
- machine fault is ouput B
    
  - **Downloading/Partnering**: Accessing existing datasets online or from partners.
    - a lot of available datasets
        - computer vision
        - image
        - self-driving
        - speech recognition
        - medical imaging

- **Avoiding Misuses**:
- bad strategy is: take 3 years to build up IT team and collect data, then we'll "do AI"
- better: 
    - collect some data
    - show/share with AI team
    - AI team can give feedback to IT team
  - **Early Feedback**: Start using data early for feedback and guidance on data collection.
    - eg, feedback from AI team might be to collect the data from the factory machine every minute instead of every 10 minutes
  - **Avoid Assumptions**: Don’t assume data will be valuable without proper AI evaluation.
  - just because you have a lot of data, doesn't mean it is useful for AI
- **Data Quality Issues**: Data can have errors or missing values, and it’s crucial to clean it.
- garbage in, garbage out
- examples of data problems
    - take the house size and price data from before, but for some rows the number of bedrooms is unknown and in some cases the price is unknown, and the size in sq feet might be unknown
- **Types of Data**:
  - **Unstructured Data**: Includes images, audio, and text, needing specific AI techniques.
  - **Structured Data**: Lives in spreadsheets and requires different AI techniques.
- **Current AI Applications**: generative AI today often generates unstructured data (text, images, audio).
- supervised learning works well with unstructured data and structured data
- **Learning Outcomes**:
  - **Understanding Data**: Identifying proper use of data and avoiding overinvestment in data infrastructure.
  - **Data Cleanup**: Handling inaccuracies and missing values in data.
  - **Next Steps**: The next video will clarify AI-related terminology.

### Vid 4: The Terminology of AI
- **AI Terminology Overview**: Understanding key terms in AI helps in discussing and applying them in business.
- Machine learning versus data science
  - back to our housing data again:

<image src="./src/assets/housing.png"/>

- first four columns are input A 
- price is the output B
- say you want to create a mobile app to help people price homes
- this would be a Machine learning system
  - specifically one that learns A to B mappings (input to output)
- data science on the other hand might involve a team analyzing data to gain insights
  - eg a conclusion might be houses of a similar size that have 3 bedrooms are more valuable than houses with 2 bedrooms
  - or let's say a newly renovated home has a premium of 15%
  - well, to maximize profit, should you add a bedroom or renovate?

- **Machine Learning (ML)**:
  - **Definition**: Field where computers learn from data without explicit programming (Arthur Samuel's definition).
  - **Example**: Housing dataset to predict prices (input A: house features; output B: price).
  - **Use**: Creates software for continuous use, e.g., online ad systems predicting clicks. Input is info about you and the ad. Output - will you click or not. Run 24/7, ML systems that drive ad revenue.
- **Data Science**:
  - **Definition**: Extracts knowledge and insights from data.
  - **Example**: Analyzing housing data to determine if more bedrooms increase value or if renovations justify a higher price.
  - **Output**: Produces insights, often in presentations for business decisions.
  - **Example in Advertising**: Analyzing data to decide where to focus sales efforts based on industry ad spending.
- **Fuzzy Boundaries**: Terms like ML and data science are not consistently used, but ML often results in operational software, while data science provides actionable insights.
- **Deep Learning and Neural Networks**:


<image src="./src/assets/deeplearning.png" />

  - **Neural Network**: A powerful ML technique for input (A) to output (B) mappings, originally inspired by the brain.
  - **Deep Learning**: Modern term for neural networks, emphasizing extensive, layered learning.
  - **Example**: Predicting house prices using inputs like size and renovation status.
- **Relation to the Brain**: Neural networks are loosely inspired by the brain but function very differently.
- **Other AI Terms**: Includes generative AI, unsupervised learning, reinforcement learning, graphical models, planning, and knowledge graphs.
- **Hierarchy of AI Concepts**:
- a Venn diagram of AI

<image src="./src/assets/AI venn diagram.png"/>

- data science is a cross-cutting subset of all of these tools
  - uses tools from AI, ML, and DL/NN
  - has its own separate tools

  - **AI**: Broad set of tools for intelligent behavior.
  - **Machine Learning**: Largest subset of AI tools, includes deep learning.
  - **Deep Learning/Neural Networks**: Key subset of ML for supervised learning and more.
  - **Data Science**: Uses many AI/ML tools but also includes unique methods for business insights.
- **Application in Business**: Understanding these terms helps in thinking about their application in a company.
- **Future Videos**: Will cover what it means for a company to excel at AI.

### Vid 5: What makes an AI company?
#### What Makes a Company Good at AI?

Becoming great at AI involves more than just using a few neural networks; it requires leveraging AI's capabilities effectively. Here's what differentiates great AI companies:

1. **Strategic Data Acquisition**: Leading AI companies, like large consumer tech firms, often launch non-monetizing products to gather valuable data that can be monetized elsewhere. This strategic approach to data collection is a hallmark of top AI firms.

2. **Unified Data Warehouses**: Successful AI companies centralize their data, ensuring all relevant information is accessible and can be analyzed cohesively. This practice facilitates pattern recognition and insights, which are critical for AI-driven decisions.

3. **Automation Opportunities**: AI companies excel at identifying tasks that can be automated using supervised learning algorithms. This reduces the need for human intervention in repetitive tasks, increasing efficiency.

4. **New Roles and Structures**: The emergence of roles like Machine Learning Engineers (MLEs) and specialized team structures enables AI companies to effectively manage and implement AI projects.

#### Learning from the Internet Era
- shopping mall + website !== internet company


The transition from traditional businesses to internet companies offers valuable lessons for the AI era. A website alone doesn’t make a company an internet business; similarly, using AI superficially doesn't make a company an AI leader. Internet companies thrived by:

- **Rapid Iteration**: Internet companies frequently deploy updates and test changes through A/B testing, allowing them to quickly learn and improve.
- **Decentralized Decision-Making**: Empowering engineers and product managers, who are closest to the technology and user needs, to make key decisions rather than relying solely on top executives.

#### AI Transformation Playbook

To transform into an AI-driven company, follow this five-step process:

1. **Execute Pilot Projects**: Start with small AI projects to build momentum and understand AI’s potential and limitations.
2. **Build an In-House AI Team**: Develop internal AI expertise and provide comprehensive AI training to both technical and non-technical staff.
3. **Develop an AI Strategy**: Formulate a clear AI strategy aligned with the company’s goals and capabilities.
4. **Align Communications**: Ensure all stakeholders, including employees, customers, and investors, are informed about the company’s AI journey and strategy.
5. **Scale and Optimize**: As the company gains proficiency in AI, scale up projects and continually optimize processes and strategies.

#### Conclusion

By following these principles and steps, any company can evolve into a successful AI enterprise, creating substantial value across industries. The forthcoming detailed guide on the AI transformation playbook will further aid in navigating this journey.

### Vid 5: What Machine Learning Can and Cannot Do
- Introduction to the goal: Developing intuition about AI capabilities and limitations.
- Importance of technical diligence before committing to an AI project.
- Common issue: CEOs often overestimate AI capabilities.
- Media and academic literature tend to highlight AI success stories, not failures.
- Aim: Show examples of AI's current capabilities and limitations to aid project selection.
- Example of current AI applications: spam filtering, speech recognition, machine translation.

<image src="./src/assets/supervisedL.png"/>



- Rule of thumb: Tasks that require less than a second of thought can often be automated with AI.
  - Examples:
    - Determining the position of other cars.
    - Identifying if a phone is scratched.
    - Transcribing spoken words.
- AI limitation: Predicting the stock market is not feasible.
  - Example: Predicting future stock prices based on historical data is unreliable.
  - Explanation: Stock prices are too random for accurate prediction by AI.
- Note: Combining historical stock prices with additional data (e.g., web traffic) might help but is still limited by market randomness.

<image src="./src/assets/stonks.png" />


- Additional rules of thumb for assessing AI feasibility:
  - Simple concepts are more feasible for AI.
    - Example: Spotting cars for a self-driving car is simpler than predicting company sales.
  - Abundant data improves feasibility.
    - Example: Thousands of labeled images increase the accuracy of detecting phone scratches. Data here means the input and the output.
- Conclusion: AI is transformative but not omnipotent; understanding its limits helps in selecting feasible projects.
- Upcoming content: More examples of AI capabilities and limitations.


### Vid 6: More Examples of What Machine Learning Can and Cannot Do
- Challenge: Recognizing AI capabilities requires seeing examples of successes and failures.
- Problem: Gaining experience with multiple AI projects takes a long time.
- Goal: Quickly show examples to help hone intuition and select valuable projects.
- Example 1: Self-driving car
  - Success: AI can determine the position of other cars using camera and sensor data (A: picture/sensor data, B: position of cars).
  - Failure: AI struggles to interpret human gestures (A: short video of gestures, B: human intention).
    - Difficulty: Large variety of gestures (requires a lot of data) and safety-critical application (requires high accuracy in output).
    - Example: Construction worker signaling to stop, hitchhiker waving, bicyclist indicating a turn.
- Example 2: Medical diagnosis
  - Success: AI can diagnose pneumonia from X-ray images (A: X-ray image, B: diagnosis).
  - Failure: AI cannot diagnose from limited data such as a few images and text from a medical textbook. (compare a human doctor who might learn a lot from a few images and a textbook)
- Summary of strengths and weaknesses:
  - Strengths: AI works well with simple concepts and large datasets.
  - Weaknesses: AI struggles with complex concepts and small datasets, and performs poorly with new types of data.
    - Example: AI trained on high-quality X-ray images fails with lower-quality or differently angled images from a different hospital.
- Human adaptability vs. AI rigidity: Humans adapt better to new types of data compared to AI.
- Encouragement: Understanding AI's capabilities and limitations helps in selecting feasible projects.
- Note: Next videos will cover neural networks and deep learning, followed by a deeper dive into the AI project development process.


### Vid 7: Non-Technical Explanation of Deep Learning part 1
- Introduction: Deep learning and neural networks are often used interchangeably in AI, and this video aims to demystify them.
  
### Example: Demand Prediction for T-Shirts
- **Scenario:** Predicting t-shirt sales based on price.
- **Simple Neural Network:**
  - **Data Set:** Higher t-shirt price leads to lower demand.
  - **Model:** Fit a straight line showing demand decreases as price increases, flattening at zero demand.
  - **Neural Network Representation:** 
    - **Input A:** Price.
    - **Output B:** Estimated demand.
    - **Structure:** A single artificial neuron (depicted as an orange circle) computes the demand.
    - **Explanation:** This is the simplest possible neural network with one neuron.

    <image src="./src/assets/tshirtDemand.png"/>



### Complex Neural Network Example
- **Additional Factors:** Shipping costs, marketing budget, material quality.
- **Neural Network Design:**
  - **Affordability Neuron:**
    - **Inputs:** Price, shipping cost.
    - **Output:** Estimated affordability.
  - **Awareness Neuron:**
    - **Input:** Marketing budget.
    - **Output:** Consumer awareness.
  - **Perceived Quality Neuron:**
    - **Inputs:** Price, marketing, material quality.
    - **Output:** Perceived quality.
  - **Demand Neuron:**
    - **Inputs:** Affordability, awareness, perceived quality.
    - **Output:** Estimated demand.
- **Structure:** This network maps four inputs (A) to the output (B) using a small network of four neurons.

<image src="src/assets/complexNN.png"/>


### Practical Application
- **Larger Networks:** Modern neural networks have thousands or tens of thousands of neurons.
- **Training Process:**
  - **Input Data (A):** Various factors affecting demand.
  - **Output Data (B):** Actual demand.
  - **Learning:** The network automatically figures out intermediate computations to map input A to output B accurately.
- **Outcome:** With sufficient data and a large enough network, neural networks can effectively map complex functions from input to output. You don't need to tell it that you are looking for affordability, awareness, or perceived quality. You DO need to give it the demand (B). Then it can learn how to calculate the demand given any set of inputs.

### Conclusion
- **Neural Network:** A collection of artificial neurons computing simple functions, stacked to form complex functions.
- **Upcoming Content:** The next video will cover a more complex example of neural networks applied to face recognition.


### Vid 8: Non-Technical Explanation of Deep Learning part 2

- Previous Video Recap: Neural network applied to demand prediction.
- Question: How can a neural network recognize faces in pictures or understand audio clips?

### Complex Example: Face Recognition
- **Goal:** Build a system to recognize people from pictures.
- **Understanding Computer Vision:**
  - Humans see a human eye; computers see a grid of pixel brightness values.
  - **Grayscale Image:** Each pixel corresponds to a single brightness value.
  - **Color Image:** Each pixel has three values (red, green, blue).
- **Neural Network Input:**
  - Grayscale image with 1000x1000 pixels = 1 million brightness values.
  - Color image with 1000x1000 pixels = 3 million values (RGB).
- **Processing:**
  - Neural network takes these pixel values as input.
  - Many artificial neurons compute various values.
  - The network figures out computations on its own.

### How Neural Networks Process Images
- Early neurons detect edges in pictures.
- Later neurons detect parts of objects (eyes, noses, cheeks, mouths).
- Final neurons detect different shapes of faces.
- **Output:** Identity of the person in the image.

### Key Points
- **Magic of Neural Networks:** The learning algorithm figures out the computations.
- **Data Requirement:** Provide lots of images (input A) and correct identities (output B).

### Conclusion
- Completion: All videos for this week finished.
- Upcoming: Learn to build your own machine learning or data science project next week.
- Farewell: See you next week.


## Building AI Projects
### Vid 1: Introduction
- **Introduction:**
  - Recap of last week's topic on basics of AI and machine learning technology.
  - Introduction to using AI technology in projects, whether in a small setting (like a garage startup) or a larger company aligning with corporate strategy.

- **AI Project Workflow:**
  - Learning about the workflow of an AI project.
  - Comparison to organizing a birthday party with predictable steps (guest list, venue, cake, invites).
  - Understanding the sequence of predictable steps in an AI project.

- **Selecting an AI Project:**
  - Learning a framework for brainstorming and selecting promising AI projects.
  - Applicable for individual efforts, small group collaborations, or larger company initiatives.

- **Organizing Data and Team:**
  - Learning how to organize data and the team for executing an AI project.
  - Scenarios include individual efforts, small group collaborations, or larger corporate teams.

- **Outcome:**
  - By the end of the week, gaining knowledge on building an AI project.
  - Encouragement to start exploring AI project ideas with friends.

- **Transition:**
  - Moving on to the next video.

### Vid 2: Workflow of a Machine Learning Project
- **Introduction:**
  - Explanation of machine learning algorithms learning input to output (A to B) mappings.
  - Introduction to building a machine learning project using speech recognition as an example.

- **Speech Recognition Example:**
  - Devices mentioned: Amazon Echo, Google Home, Apple Siri, Baidu DuerOS.
  - Personal example: Using Amazon Echo to set a timer for boiling eggs.
  - Key steps for building a speech recognition system:
    - **Collect Data:**
      - Record people saying "Alexa" and other words.
    - **Train the Model:**
      - Use machine learning algorithms to learn from audio clips.
      - Expect initial attempts to not work well and require iteration.
    - **Deploy the Model:**
      - Put the AI software into smart speakers for testing or wide release.
      - Monitor performance with new data, such as different accents, and update the model as needed.

- **Summary of Machine Learning Project Steps:**
  - Collect data.
  - Train the model.
  - Deploy the model.
  - Importance of iteration and adaptation based on new data.

- **Self-Driving Car Example:**
  - Key component: Machine learning algorithm to detect other cars.
  - Key steps:
    - **Collect Data:**
      - Gather images and annotate positions of cars.
    - **Train the Model:**
      - Train the algorithm to recognize cars, expect initial errors, and iterate.
    - **Deploy the Model:**
      - Ensure safety in deployment.
      - Use new data (e.g., images of golf carts) to update and improve the model.

- **Conclusion:**
  - Key steps of a machine learning project:
    - Collect data.
    - Train the model.
    - Deploy the model.
  - Introduction to the workflow of a data science project in the next video.

### Vid 3: Workflow of a Data Science Project

- **Introduction:**
  - Data science projects output actionable insights that may lead to changes in actions.
  - Data science projects have a different workflow than machine learning projects.

- **Optimizing a Sales Funnel Example:**
  - **Context:**
    - Running an e-commerce website selling coffee mugs.
    - Steps for a user to buy: visit website, view product page, add to cart, checkout.
  - **Key Steps of a Data Science Project:**
    - **Collect Data:**
      - Track user activity on the website and gather user information (e.g., country via IP address).
    - **Analyze Data:**
      - Identify factors affecting the sales funnel.
      - Example insights:
        - International shipping costs deterring overseas customers.
        - Shopping patterns around holidays.
        - Time-of-day shopping patterns in countries observing siesta.
      - Iterate to generate actionable insights.
    - **Suggest Hypotheses and Actions:**
      - Incorporate shipping costs into product costs.
      - Adjust advertising spend based on user activity patterns.
    - **Deploy Changes and Collect New Data:**
      - Implement suggested actions on the website.
      - Collect and analyze new data to refine actions.

- **Optimizing a Manufacturing Line Example:**
  - **Context:**
    - Manufacturing coffee mugs in a factory.
    - Key steps: mix clay, shape mugs, add glaze, fire in kiln, inspect mugs.
  - **Key Steps:**
    - **Collect Data:**
      - Gather data on clay batches, mixing process, moisture content, kiln temperature, and firing duration.
    - **Analyze Data:**
      - Identify factors affecting mug quality.
      - Example insights:
        - Low humidity and high kiln temperature causing cracks.
        - Afternoon warmth requiring adjustments to humidity and temperature.
    - **Suggest Hypotheses and Actions:**
      - Adjust operations based on data insights to reduce defects.
    - **Deploy Changes and Collect New Data:**
      - Implement changes in the manufacturing process.
      - Collect and reanalyze data to further optimize the process.

- **Conclusion:**
  - Key steps of a data science project: collect data, analyze data, suggest hypotheses and actions.
  - Machine learning and data science impact almost every job function.
  - Next video will explore how these ideas affect various job functions, including potentially yours and your colleagues'.

### Vid 4: Every Job Function Needs to Learn How to Use Data

- **Introduction:**
  - Data is transforming various job functions, including recruiting, sales, marketing, manufacturing, and agriculture.
  - Digitization of society has increased the availability of data.
    - eg doctor's notes are digital
  - Data science and machine learning tools can help improve job functions.

- **Impact on Sales:**
  - Data science optimizes sales funnels.
  - Machine learning helps prioritize sales leads, making salespeople more efficient.
  - Example: Prioritizing the CEO of a large company over an intern from a smaller company.

- **Impact on Manufacturing:**
  - Data science optimizes manufacturing lines.
    - coffee mug example
  - Machine learning automates final inspection to detect defects, reducing labor costs and improving quality.
  - Example: Automated visual inspection for scratches or dents in coffee mugs.

- **Impact on Recruiting:**
  - Data science optimizes recruiting funnels.
    - predictable sequence: email outreach => phone screen => onsite interview => offer
  - Example: Adjusting the number of candidates moving from phone screen to on-site interviews based on data analysis.
  - Machine learning automates resume screening.
  - Ethical concerns: Ensuring AI software is unbiased and treats candidates fairly.

- **Impact on Marketing:**
  - Data science uses AB testing to optimize website performance
    - i.e. how well does version A convert versus version B
  - Example: Comparing red and green buttons to see which generates more clicks.
  - Machine learning provides customized product recommendations, significantly increasing sales.
  - Example: A clothing website recommending blue shirts based on user shopping behavior.

- **Impact on Agriculture:**
  - Data science used for crop analytics, optimizing planting decisions based on soil and weather conditions.
  - Machine learning enables precision agriculture.
  - Example: Using machine learning to precisely target and spray weed killers, improving crop yields and preserving the environment.

- **Conclusion:**
  - Data science and machine learning are affecting various job functions.
  - Upcoming discussion: How to select a promising AI project to work on.


### Vid 5: How to Choose an AI Project
- **Selecting a Worthwhile AI Project**:
  - Finding a valuable AI project idea can take time.
  - Use a brainstorming framework to identify potential AI projects.

- **Intersection of Feasibility and Value**:
  - AI can't do everything; there's a set of things AI can do.
  - There’s also a set of things valuable for your business.
  - Select projects at the intersection of these two sets.
  - AI experts understand what AI can do; domain experts understand business value.
  - Form cross-functional teams with both AI and domain experts to brainstorm.

- **Principles for Brainstorming AI Projects**:
  - **Automating Tasks vs. Jobs**:
    - Focus on automating specific tasks, not entire jobs.
    - Example: Call centers – tasks like call or email routing might be suitable for automation.
    - Example: Radiologists – AI could assist with reading X-rays while other tasks remain manual.
  
  - **Drivers of Business Value**:
    - Identify main drivers of business value.
    - Find AI solutions to augment these drivers.

  - **Addressing Business Pain Points**:
    - Identify main pain points in your business.
    - Some pain points might be solvable with AI.

- **Data Requirements**:
  - Progress is possible without big data.
  - More data is generally better but not always necessary.
    - data can make some businesses defensible (web search)
    - having access to the rare searhes that people make (as a large web search company) can be advantageous
  - Example: Visual inspection of coffee mugs – progress can be made with a small dataset.
    - as few as 10, 100, 1000 images
  - Amount of data needed is problem-dependent; consult with an AI expert.
    - some problems do require big data

- **Next Steps**:
  - Discuss selecting and committing to specific projects in the next video.

### Vid 6: How to Choose an AI Project (Part Deux)

- **Introduction to AI Project Evaluation:**
  - Before committing to an AI project, especially long-term ones, ensure it's worthwhile.
  - For quick projects, jump in and test feasibility immediately.
  - For projects taking months, use due diligence to confirm their value and feasibility.

- **Due Diligence:**
  - Due diligence involves verifying the project's feasibility and value.
  - Two main types: technical diligence and business diligence.

- **Technical Diligence:** (what can AI Do)
  - Ensure the AI system is feasible:
    - Consult AI experts or literature on system performance.
    - Example: Checking if a speech system can achieve 95% accuracy.
    - Example: Ensuring a factory inspection system can be 99% accurate.
  - Assess the required data and its availability.
  - Estimate the engineering timeline and resources needed.

- **Business Diligence:** (what is valuable for business)
  - Ensure the project provides business value:
    - Examples: Lowering costs through automation or increasing efficiency.
    - Examples: Increasing revenue by improving checkout rates (webstore) or launching new products.
  - Create financial models to estimate value and economics before committing.

- **Ethical Diligence:**
  - Consider the societal impact of the AI project.
  - Ensure the project benefits humanity and society.

- **Build vs. Buy Decision:**
  - Evaluate whether to build AI systems in-house or outsource:
    - Example: Companies buy computers and Wi-Fi routers instead of building them.
    - Machine learning projects can be outsourced for faster talent access. (or can be in-house)
    - Data science projects are often done in-house due to close business ties.
      - takes deep day-to-day knowledge to do good DS
  - Build specialized, unique projects and buy industry-standard solutions.
  - Avoid "sprinting in front of a train":
    (the train is the industry standard solution)
    - Don't try to outpace industry-standard solutions.
    - Embrace industry standards when beneficial.

- **Resource Allocation:**
  - Focus limited resources on the most unique and impactful projects.
  - Conduct technical and business diligence to identify promising projects.
  - Spend weeks on diligence for large projects before committing.

- **Next Steps:**
  - Once promising projects are identified, learn how to engage and work with an AI team in the following video.


### Vid 7: Working with an AI Team

- **Introduction to Working with an AI Team:**
  - Learn how AI teams think about data to effectively collaborate on AI projects.
  - If you lack access to AI engineers, online courses in machine learning or deep learning can help.

- **Specifying Acceptance Criteria:**
  - Define clear acceptance criteria for the AI project.
  - Example: Detecting defects in coffee mugs with at least 95% accuracy.
  - Provide a dataset (test set) for measuring performance against the criteria.

- **Understanding the Test Set:**
  - A test set consists of labeled images to evaluate AI performance.
  - Example: A test set of 1,000 pictures might suffice, but consult AI experts for precise needs.

- **Statistical Performance:**
  - AI performance is often specified statistically (e.g., percentage accuracy).
  - Example: Requesting 95% accuracy rather than perfect performance.

- **Datasets in AI:**
  - AI teams use two main datasets: training set and test set.
  - **Training Set:**
    - Contains labeled images (e.g., coffee mugs marked as okay or defective).
    - Used by machine learning algorithms to learn the mapping from input to output.
  - **Test Set:**
    - Different from the training set, used to evaluate AI performance.
    - Example: Achieving 66.7% accuracy on a three-image test set.
      - i.e. if it got 2 of 3 examples correct 2/3 = 66.7%
    - for most problems, the training set is much, much, much bigger than the test set

- **Additional Test Sets:**
  - AI teams might need two test sets (development/validation sets) for technical reasons.
  - Providing multiple test sets is reasonable if requested.
    - the reason AI teams need two test sets is beyond the scope of the course/technical

- **Avoiding the 100% Accuracy Pitfall:**
  - Expecting 100% accuracy from AI software is unrealistic.
  - Challenges include:
    - Technological limitations of current machine learning.
    - Insufficient or messy data.
    - Ambiguous or mislabeled data.
  - Example: A green coffee mug mislabeled as defective.

- **Improving AI Accuracy:**
  - Collect more data to improve performance.
  - Clean up mislabeled data and resolve ambiguous labels.

- **Setting Realistic Goals:**
  - Discuss with AI engineers to determine a reasonable accuracy level.
  - Aim for a balance that meets both technical and business diligence without demanding 100% accuracy.

- **Conclusion:**
  - You've learned the basics of building and evaluating AI projects.
  - Optional video available on technical tools used by AI teams.
  - Next week’s focus: How AI projects fit within a larger company context.


### Vid 8: Technical Tools for AI Teams (optional)

- AI teams use various tools to build AI systems, many of which are open-source.
- Common AI tools and frameworks include:
  - PyTorch
  - TensorFlow
  - Hugging Face
  - PaddlePaddle
  - Scikit-Learn
  - R
- These tools help AI teams be more effective.
- AI technology breakthroughs are often published on a website called arXiv (pronounced archive).
- Teams frequently share their code on GitHub, a major repository for open-source software.
  - Example: Searching for face recognition software on GitHub can provide detailed and useful software descriptions.
- AI engineers often discuss hardware like CPUs and GPUs:
  - CPU (Central Processing Unit): Found in desktops, laptops, and cloud servers, made by companies like Intel and AMD.
  - GPU (Graphics Processing Unit): Originally for graphics processing, now used for training large neural networks.
    - Companies like Nvidia and Qualcomm, and Google with its TPUs, are making specialized hardware for AI.
- AI deployments can be categorized into:
  - Cloud Deployments: Renting compute servers from providers like AWS, Azure, or GCP.
  - On-Premises Deployments: Using locally owned compute servers.
  - Edge Deployments: Processing data locally on the device where data is collected, such as in self-driving cars or smart speakers.
    - Example: Self-driving cars and smart speakers use edge deployment to increase response time and reduce data transmission.
- The video aims to provide a better understanding of AI tools and terms used by AI engineers.

## Week 3
### Vid 9: Introduction
- **Introduction**
  - Review of last two weeks: Learning about AI and building an AI project.
  - This week's focus: Projects in the context of a company (for-profit, non-profit, government).

- **AI in Companies**
  - Applicability of building AI for various organizations.
  - CEO-level talk, but useful for everyone aiming to improve their organization with AI.
  - It takes 2-3 years for a company to become good at AI.
  - Goal: Paint a vision for long-term AI integration and provide concrete short-term steps.

- **Topics Covered This Week**
  - **Case Studies of Complex AI Products**
    - Example products: Smart speakers, self-driving cars.
    - Focus on multiple modules working together.

  - **Major Roles in an AI Team**
    - Building large AI teams with dozens or hundreds of people.
    - Defining the roles and tasks of team members.
    - Roadmap for building an AI team.

  - **AI Transformation Playbook**
    - Helping companies become good at AI.
    - Moving beyond one or two projects to company-wide AI effectiveness and value.

  - **Concrete First Steps**
    - Immediate actions to start building AI in your company.

- **Additional Content**
  - Optional videos on major AI application areas and techniques.


### Vid 10: Case Study: Smart Speaker
- **Introduction to Working on Complex AI Products**
  - Focus on more complex AI projects beyond a single machine-learning algorithm.
  - Introduction to two case studies: smart speaker and self-driving car.

- **Case Study 1: Smart Speaker**
  - **Context and Popularity**
    - Smart speakers and voice-activated devices are becoming increasingly popular.
    - Example command: "Hey device, tell me a joke."

  - **Steps to Process a Command**
    1. **Trigger Word Detection**
       - Detects wake word "Hey device" using a machine-learning algorithm.
       - Outputs 0 or 1 indicating presence of wake word.
    2. **Speech Recognition**
       - Transcribes audio after wake word to text, e.g., "Tell me a joke."
       - also uses machine learning to map the audio to text output
    3. **Intent Recognition**
       - Determines user’s intent from the transcribed text.
       - Maps text to specific commands like telling a joke, checking the weather, etc.
    4. **Command Execution**
       - Executes the command (e.g., selects and tells a joke).

- these multiple steps are an "AI pipeline"
- not unusual to have four teams where each team focuses on one of the steps

  - **Example: Setting a Timer**
    - Similar initial steps: trigger word detection, speech recognition, and intent recognition.
    - Additional step to extract duration from the command (e.g., "10 minutes").
    - Executes by starting a timer for the specified duration.

- other functions of smart speaker
- play music
- volume up/down
- make call
- current time
- units conversion
- simple question

  - **Challenges in Smart Speaker Functionality**
    - Requires multiple specialized software components for various functions.
    - Extensive software engineering effort to support numerous commands (e.g., playing music, making calls).
    - User training is crucial to help users understand the capabilities and limitations of smart speakers.
      - it's hard for a user to keep in their head all of the things a speaker can do or cannot do

- **Conclusion**
  - Overview of the complexity involved in building AI products like smart speakers.
  - Transition to the next case study: building a self-driving car.

### Vid 11: Case Study: Self-Driving Car

- **Introduction to Self-Driving Cars**
  - Exciting yet mysterious AI product.
  - Simplified description to understand how multiple AI components work together.

- **Key Steps in Driving a Self-Driving Car**
  - **Sensor Inputs**
    - Various sensors: cameras (front, sides, rear), radar, and Lidar.
  - **Car and Pedestrian Detection**
    - Detects cars and pedestrians using machine learning.
    - Inputs: pictures, radar, and Lidar; outputs: locations of cars and pedestrians.
  - **Motion Planning**
    - Plans the car’s path to avoid collisions while progressing to the destination.
    - Translates the path into specific steering, acceleration, and brake commands.

- **Detailed Steps Explained**
  - **Car Detection**
    - Uses supervised learning with multiple cameras and sensors (radar, Lidar).
  - **Pedestrian Detection**
    - Similar sensors and techniques as car detection.
  - **Motion Planning**
    - Example 1: Path planning to follow a road without hitting the car in front.
    - Example 2: Path planning to overtake a parked car on the side of the road.

- **Additional Components in Real Self-Driving Cars**
  - **Enhanced Inputs**
    - GPS, accelerometers (IMU), gyroscopes, and maps for more accurate positioning and context.
  - **Trajectory Prediction**
    - Predicts future positions of detected cars and pedestrians.
  - **Lane and Traffic Light Detection**
    - Detects lane markings and traffic light signals (red, yellow, green).
  - **Other Obstacles**
    - Detects unexpected obstacles like traffic cones or animals (e.g., geese).

- **Team Structure in Self-Driving Car Development**
  - Large teams or multiple people working on each component (car detection, pedestrian detection, motion planning, etc.).
  - Complexity requires coordination of various specialized teams.

- **Conclusion and Transition**
  - Importance of team collaboration in building complex AI products.
  - Next video will cover key roles in large AI teams and vision for future team building.


### Vid 12: Example Roles of an AI Team

- **Introduction to AI Teams**
  - AI products may require large teams (e.g., 100+ engineers).
  - Understanding roles and responsibilities in a large AI team.
  - Useful insights for small teams (1-5 people).
  - Job titles and responsibilities can vary across companies.

- **Common Roles in AI Teams**
  - **Software Engineers**
    - Write specialized software for tasks (e.g., smart speaker functions, self-driving car reliability).
    - Often make up a large portion of AI teams (sometimes 50% or more).
  - **Machine Learning Engineers**
    - Develop algorithms for A to B mappings and other machine-learning tasks.
    - Gather data, train models, and ensure accurate outputs.
  - **Machine Learning Researchers**
    - Extend the state-of-the-art in machine learning.
    - May publish research papers or focus on advancing company-specific AI capabilities.
  - **Applied Machine Learning Scientists**
    - Bridge the gap between research and engineering.
    - Adapt cutting-edge techniques to practical problems (e.g., wake word detection for smart speakers).

- **Additional Roles in AI Teams**
  - **Data Scientists**
    - Examine data, provide insights, and aid business decision-making.
    - Role is evolving; some tasks overlap with machine learning engineers.
  - **Data Engineers**
    - Organize and manage large volumes of data.
    - Ensure data is accessible, secure, and cost-effective.
    - Handle data storage from gigabytes to petabytes (e.g., self-driving car data).
  - **AI Product Managers**
    - Decide what to build and determine feasibility and value.
    - Need new skill sets specific to AI capabilities and limitations.

- **Data Storage Challenges**
  - Managing large volumes of data is complex.
  - Examples:
    - Megabytes (MB): Typical song file.
    - Gigabytes (GB): Hour-long movie.
    - Terabytes (TB) and Petabytes (PB): Large datasets (e.g., self-driving car data).

- **Starting with Small AI Teams**
  - Small teams (or even individuals) can begin AI projects.
  - Online courses in machine learning, deep learning, or data science can be sufficient to start.
  - Emphasis on starting small and scaling up.

- **Next Steps: AI Transformation Playbook**
  - Integrating AI teams into larger company structures.
  - Roadmap for companies to become proficient in AI.
  - Upcoming videos will delve into the AI transformation playbook.

### Vid 13: AI Transformation Playbook (part I)

- **Introduction to AI Transformation Playbook**
  - Experience from leading Google Brain Team and Baidu's AI group.
  - Five steps to help companies become good at AI.
  - Useful for everyone in the company, not just CEOs.

- **Five Steps of the AI Transformation Playbook**
  - **Step 1: Execute Pilot Projects**
    - Aim for success to gain momentum.
    - Example: Google Brain Team’s first project with speech recognition.
    - Select projects with a high chance of success.
    - Show traction within 6-12 months.
    - First projects can be in-house or outsourced.
  - **Step 2: Build an In-House AI Team**
    - Centralize the AI team.
    - Matrix AI talent into different business units.
    - Example: Gift card business unit and centralized AI team collaboration.
    - Develop company-wide platforms and tools.
    - The AI unit can report to various senior executives.
    - Initial funding from the CEO helps get momentum.
  - **Step 3: Provide Broad AI Training**
    - Train executives and senior leaders on AI basics and strategy.
      - learn what ai can do for business, AI strategy, resource allocation
    - Leaders of divisions working on AI projects should learn:
      - set project direciton (technical and business diligence)
      - resource allocation
      - monitor progress
    - Suggested training duration: Executives (~4 hours), Division leaders (at least 12 hours).
    - Train existing engineers in AI skills (~100 hours of training).
      - learn to
        - build and ship AI software
        - gather data
        - execute on specific AI projects
    - Utilize online digital content for training.
  - **Step 4: Develop Your AI Strategy**
    - (To be covered in the next video)
  - **Step 5: Develop Internal and External Communications**
    - (To be covered in the next video)

- **Importance of Pilot Projects**
  - Focus on quick success rather than high value.
  - Example: Google Maps Team as a second customer.
  - Success builds internal momentum and credibility.

- **Building an AI Team**
  - Centralized AI team ensures consistent standards.
  - Helps business units leverage AI effectively.
  - Provides resources for company-wide initiatives.

- **Providing AI Training**
  - Essential for all levels within the company.
  - Enables better decision-making and project management.
  - Addresses the shortage of AI engineers through in-house training.

- **Getting Started with Training**
  - Leverage online resources (courses, books, YouTube, blog posts).
  - Curate (rather than create) content with the help of a Chief Learning Officer (CLO).

- **Conclusion of Steps 1-3**
  - Initial projects, team building, and training create AI momentum.
  - AI impacts company strategy and stakeholder alignment.

- **Next Steps**
  - Next video will discuss AI strategy and aligning stakeholders.


### Vid 14: AI Transformation Playbook (part II)
- **Previous Video Recap**:
  - Executed pilot projects to gain momentum.
  - Built an in-house AI team.
  - Provided broad AI training.

- **Long-term AI Strategy**:
  - Aim to create a valuable and defensible business using AI.
  - Discuss AI strategy and internal/external communications.

- **Five-Step AI Transformation Playbook**:
  - This video focuses on steps four and five.
  
- **Step Four: Develop an AI Strategy**:
  - Leverage AI for an industry-specific advantage.
  - Strategy development is step four, not step one, contrary to many CEOs' preferences.
  - Early AI strategies often become academic and not practical.
  - Example: CEOs copying newspaper headlines into their strategies, which may not be suitable for their companies.
  - Recommended approach: Execute pilot projects, build a team, and provide training first, then formulate the strategy.
  - Executives need a deeper understanding of AI's potential and limitations before defining strategy.

- **Align with the Virtuous Cycle of AI**:
  - **Example from Web Search**:
    - Better product attracts more users.
    - More users generate more data.
    - More data improves the product.
    - This cycle makes it hard for new entrants to compete.
  - Smaller teams can also leverage this cycle in new verticals.
  
- **Case Study: Blue River**:
  - Acquired by John Deere for over $300 million.
  - Developed AI-driven agricultural technology.
  - Initial data collection: Personal cameras used by founders to photograph crops and weeds.
  - Early product trained on a small dataset, convincing some users to adopt it.
  - Data collection expanded through usage, improving the product.
  - Entered a positive feedback loop: More data led to a better product, attracting more users and thus more data.
  - Built a significant data asset, making the business defensible even against large tech companies.

- **AI specialization over general competition:**
  - Large tech companies excel at AI but competing with them broadly isn't necessary.
  - Focus on AI specialized for your industry and application areas for better results.

- **AI strategy in an AI-powered world:**
  - A well-defined AI strategy helps navigate changes effectively.
  - Create a data strategy similar to leading AI companies that excel in strategic data acquisition.

- **Examples of strategic data acquisition:**
  - Large consumer-facing AI companies offer free services (e.g., email, photo sharing) to collect data and monetize it through targeted ads.

- **Unified data warehouse:**
  - Centralizing data warehouses enhances the ability of AI to connect dots and identify patterns.
  - Example: Linking manufacturing data with customer complaints to improve processes and reduce faulty products.

- **AI creating network effects and platform advantages:**
  - In winner-take-all industries, AI accelerates growth and platform defensibility.
  - Example: Ride-hailing businesses (Uber, Lyft) and social media platforms (Twitter, Facebook) benefit from strong network effects.
  - AI can accelerate user acquisition, increasing the chance of dominating the business vertical.

- **Tailored AI strategy:**
  - AI strategies must be specific to the company, industry, and situation.
  - The provided principles offer a framework for developing key elements of an AI strategy.

- AI can fit into traditional strategy frameworks.
  - Michael Porter discussed low cost and high value strategies.
  - For a low cost strategy, AI can help reduce costs.
  - For a high value strategy, AI can increase the value of products.
  - AI capabilities can augment existing corporate strategy elements.

- Building valuable and defensible businesses with AI.
  - Aim to build businesses that make people better off.
  - AI is a powerful tool for creating great companies.
  - Use AI in ways that benefit humanity.

- Developing internal and external communications.
  - Communicate AI changes to relevant stakeholders.
  - Investor relations are crucial for valuing AI companies.
  - Government relations are important in regulated industries (e.g., healthcare).
  - Collaborate with governments in public-private partnerships.
  - Ensure AI solutions benefit people while protecting consumers and patients.
  - Applies to healthcare, self-driving cars, finance, and other AI verticals.

- Importance of user education if products change.
  - Showcasing AI successes can help with talent and recruiting.
  - Internal communications are important to address concerns about AI.
  - Reassure employees to alleviate legitimate and irrational worries.

- Vision for helping companies become good at AI.
  - Companies can become more valuable and effective by embracing AI.
  - These ideas can help take the first step towards AI proficiency.

- Common pitfalls in AI implementation.
  - Next video will discuss common pitfalls to avoid when implementing AI across the enterprise.

### Vid 15: AI Pitfalls to Avoid
- Aim to use AI to create valuable projects for yourself or your company and improve lives.
- Avoid common pitfalls in AI development.

**Five Key Points for Building AI in Your Company:**

1. **Realistic Expectations:**
   - AI can't solve everything; be realistic about its capabilities and limitations.
   - Conduct technical and business diligence for feasible AI projects.

2. **Collaborative Teams:**
   - Don't rely solely on a few machine learning engineers for use cases.
   - Pair engineering talent with business talent for valuable and feasible projects.

3. **Iterative Process:**
   - AI development is iterative; plan for multiple attempts.

4. **Adapted Planning:**
   - Traditional planning processes need adjustments for AI projects.
   - Work with AI teams to establish appropriate timeline estimates, milestones, KPIs, and metrics.

5. **Team Building:**
   - Don't wait for superstar AI engineers; start with the team you have.
   - Many capable AI engineers are available, including those from online courses.

- Starting AI projects is crucial; improvement comes with subsequent projects.
- Move on to the next steps with concrete actions in AI development.


### Vid 16: Taking Your First Steps in AI
- **Complex AI Products:**
  - Examples: Smart speakers, self-driving cars
  - Learnings: Roles and responsibilities in large AI teams, building large AI teams, AI transformation playbook

- **Addressing Daunting Tasks:**
  - Execution time: 2-3 years for some tasks
  - Importance: Taking the first step is crucial
  - Course impact: Taking the course is a significant first step

- **Next Steps in AI:**
  - **Learning with Friends:**
    - Involving friends at work or personal friends
    - Activities: Taking the course together, starting a reading group

  - **Brainstorming Projects:**
    - Starting small projects with friends, especially engineering friends
    - Taking online machine learning courses to gain sufficient knowledge

  - **In a Company:**
    - Hiring machine learning or data science personnel
    - Providing in-house training for existing talent
    - Potentially appointing an AI leader (VP of AI or Chief AI Officer)

- **AI Transformation:**
  - Discussing AI transformation with CEO and Board
  - Key question: Will the company be more valuable and effective with AI?
  - Varying difficulty levels for execution

- **Encouragement:**
  - Use the tools and knowledge gained to help yourself, your company, and others
  - Opportunities for both technical and non-technical individuals to contribute to AI efforts

- **Optional Videos:**
  - Topics: Survey of major AI application areas and techniques
  - Examples: Computer Vision, Natural Language Processing, Reinforcement Learning, Unsupervised Learning
  - Purpose: Better communication with AI engineers
  - Encouragement to watch for deeper understanding

- **Conclusion:**
  - Thanking viewers and looking forward to next week's videos


### Vid 17 Survey of Major AI Application Areas (optional)
- AI is being successfully applied to various data types: image, video, language, speech.
- The video surveys AI applications in these areas to inspire ideas for personal projects.
- **Computer Vision**:
  - **Image Classification and Object Recognition**:
    - Example: Identifying a cat in a picture.
    - Recognizing specific types of flowers and food.
  - **Face Recognition**:
    - Example: Unlocking devices based on face identity.
    - Caution on respecting privacy.
  - **Object Detection**:
    - Example: Self-driving cars identifying and locating cars and pedestrians.
  - **Image Segmentation**:
    - Example: Precise boundaries around objects, such as identifying organs in X-rays.
  - **Video Tracking**:
    - Example: Tracking runners' movements over time in a video.
    - Tracking wildlife, like birds, in videos.
- **Natural Language Processing (NLP)**:
  - **Text Classification**:
    - Example: Classifying emails as spam or non-spam.
    - Automatically categorizing product descriptions for online listings.

- **Sentiment Recognition**
  - Analyzes text to determine the sentiment, e.g., reviews.
  - Example: "The food was good" might be a four-star review.
  - Example: "Service was horrible" might be a one-star review.

- **Information Retrieval**
  - Finds relevant documents based on text queries.
  - Example: Web search engines.
  - Example: Internal corporate search systems for company documents.

- **Name Entity Recognition**
  - Identifies names of people, places, companies, etc., in text.
  - Example: "Queen Elizabeth" and "Sir Paul McCartney" in a sentence.
  - Can also extract company names, phone numbers, and countries from large document collections.

- **Machine Translation**
  - Translates text from one language to another.
  - Example: Translating Japanese to English.

- **Audio Data Processing**
  - **Speech Recognition (Speech-to-Text)**
    - Converts audio waveforms into text.
    - Example: Identifying words in an audio recording of "machine learning."
  - **Trigger Word Detection**
    - Detects specific wake words like "Alexa" or "Hey Google."
  - **Speaker ID**
    - Identifies the speaker from their voice, similar to face recognition.
  - **Speech Synthesis (Text-to-Speech, TTS)**
    - Converts text into spoken audio.
    - Example: "The quick brown fox jumps over the lazy dog," a sentence containing every letter from A to Z, when processed, produces natural-sounding audio.

- **Generative AI**:
  - Produces high-quality media: text, images, audio.
  - **Text Generation**:
    - Large language models handle tasks like writing, summarizing, and editing.
    - Example: Suggesting creative names for chocolate ice cream.
    - Prompts: Input texts to generate desired outputs.
    - Benefits: Productivity boost for knowledge workers.
  - **Image Generation**:
    - Tools: Journey Ali, Adobe Firefly, Stable Diffusion.
    - Process: Generate images from text descriptions.
    - Example: "A purple-friendly robot eating ice cream."
  - **Audio Generation**:
    - Tools: SyboI's Stable Audio, Meta's Audicraft.
    - Process: Generate music and sound effects from text prompts.
    - Example: "Drum solo, 140 BPM."

- **Impact of Generative AI**:
  - Affects multiple industry sectors.
  - Future lessons: Impact on jobs.

- **AI in Robotics**:
  - **Perception**: Understanding the environment using sensors.
    - Example: 3-D laser scan from a self-driving car.
  - **Motion Planning**: Creating a path and speed for movement.
    - Example: Planning a left turn for a car.
  - **Control**: Executing movement commands.
    - Example: Steering, gas pedal, and brake controls.

- **Machine Learning Applications**:
  - Applies to both unstructured (images, audio, text) and structured data (tables).
  - Popular focus: Unstructured data due to its universal appeal and ease of understanding.
  - Structured data: Significant economic value, less media coverage due to specificity.

- **Supervised Learning**:
  - Most discussed technique: Learning from labeled data (input-output mappings).
  - **Other AI Techniques**:
    - Unsupervised learning.
    - Reinforcement learning.
    - Future lesson: Overview of various AI techniques.


### Vid 18 Survey of Major AI Techniques (optional)


## Week 4
### Vid 1 Introduction
- Welcome back to the fourth and final week of AI for everyone.
- AI is a superpower that enables small teams to impact many lives.
- It's crucial to understand AI trends to ensure positive societal impact.
- AI is changing the world but is also surrounded by unnecessary hype.
- Having a realistic view of AI is important for citizens, business leaders, and government leaders.
- In week one, you learned about some technical limitations of AI.
- AI has other limitations, such as:
  - Bias and unfair discrimination against minorities and other groups.
  - Susceptibility to adversarial attacks (e.g., spammers attacking spam filters).
- AI is widely used in developed economies like the US and China.
- AI will significantly impact developing economies and the global job landscape.
- Many issues in AI relate to ethics, a complex topic without simple answers.
- The topic of AI and ethics could warrant its own extensive course.
- This week will touch on major ethical issues in AI.
- The goal is to build or use AI with an understanding of these major issues.
- This week will wrap up the AI for everyone course.
- The next video will discuss having a realistic view of AI beyond technical and performance limitations.

### Vid 2 A Realistic View of AI

- **Impact of AI on Society**:
  - AI is significantly affecting society and many people's lives.
  - Important to have a realistic view of AI, avoiding extreme optimism or pessimism.

- **Goldilocks Rule for AI**:
  - Story of Goldilocks and the three bears: porridge should be neither too hot nor too cold, and a bed should be neither too firm nor too soft.
  - Similarly, we should have a balanced view of AI's capabilities.

- **Avoiding Over-Optimism**:
  - AI is powerful but won't solve all of humanity's problems or create a utopia.
  - Over-optimism stems from beliefs in imminent AI sentience, general intelligence, and superintelligence.
  - Unrealistic expectations of breakthroughs in healthcare and wealth creation.

- **Avoiding Over-Pessimism**:
  - Fears about AI superintelligence leading to human extinction are unlikely.
  - Risks exist (e.g., bias, inaccurate outputs) but fears of losing control to AI are exaggerated.
  - Humanity has experience managing powerful entities like corporations and nation-states.

- **Realistic View of AI**:
  - AI is a powerful tool with limitations, such as bias and inaccurate outputs.
  - It is creating significant economic value and has potential for more.
  - AI will continue to grow and benefit more people.

- **Goldilocks Principle for AI**:
  - Balance between optimism and pessimism is key.
  - Share the Goldilocks rule to promote a realistic view of AI.

- **Explainability Issue in AI**:
  - Many high-performing AI systems are black boxes.
  - Example: AI diagnosing pneumothorax from an x-ray, but how to trust its diagnosis?
  - Explainability helps gain confidence in AI outputs.
  - Humans also struggle to explain their decision-making process.
  - Explainability is crucial for AI acceptance and improvement.

- **Bias and Discrimination in AI**:
  - AI can inherit biases from data reflecting societal inequalities.
  - The AI community is working to address these issues but much work remains.

- **Adversarial Attacks on AI**:
  - AI systems can be vulnerable to deliberate attempts to fool them.
  - Important to protect AI systems from such attacks.

- **Importance of Addressing AI Issues**:
  - Bias and adversarial attacks on AI are critical issues for developers and society.
  - Next video will explore AI and bias in more detail.

### Vid 3 Discrimination/Bias
- **AI Bias and Discrimination:**
  - AI systems can develop biases and discriminate against people.
  - Example: Microsoft found AI learned unhealthy stereotypes from Internet text files.
  
- **Bias in AI Analogies:**
  - AI learns word associations from Internet text.
  - Example: "man is to woman as father is to mother" reflects typical usage.
  - Bias Example: "man is to computer programmer as woman is to homemaker."

- **Reducing Bias in AI Systems:**
  - AI stores words as sets of numbers based on usage statistics.
  - Bias occurs when these statistics reflect societal biases.
  - Example: AI analogy "man is to computer programmer as woman is to homemaker" is biased.

- **Importance of Reducing Bias:**
  - AI makes important decisions, so bias matters.
  - Examples:
    - Hiring AI discriminating against women.
    - Facial recognition systems working better for lighter skin tones.
    - Loan approval systems discriminating against minority ethnic groups.

- **AI Reinforcing Stereotypes:**
  - Example: Image search showing only men for "Chief Executive Officer" discourages diversity.

- **Efforts to Combat AI Bias:**
  - Technical solutions: Zeroing out bias-related numbers.
    - assuming words are stored as numbers, by zeroing out the numbers that contribute to the bias you can remove or lessen it
  - Using more inclusive data.
    - include data from multiple ethnicities and all genders
  - Transparency and auditing processes.
  - Example: Checking facial recognition accuracy for different skin tones.
  - Diverse workforce helps spot and address bias.

- **Optimism for Reducing AI Bias:**
  - Better ideas for reducing AI bias than human bias.
  - Potential to make AI decisions more fair and less biased.
  
- **Next Topic:**
  - Introduction to adversarial attacks on AI and protection strategies.


### Vid 4 Adversarial Attacks on AI
- Modern AI, particularly deep learning, can sometimes be fooled by adversarial attacks.
  - Example: An AI classifies a bird image as a hummingbird, but with minor pixel changes, it classifies it as a hammer.
  - Example: A hare image with slight perturbation is classified as a desk.
  
- AI systems see images differently than humans, making them susceptible to imperceptible changes that fool the system.
  - These adversarial attacks exploit the differences in how AI and humans perceive images.
  
- AI is used in applications like spam filtering and hate speech detection, but attacks can reduce their effectiveness.
  - Example: Spammers might modify images to bypass AI filters.
  
- Some adversarial attacks involve physical changes:
  - Example: Carnegie Mellon researchers designed glasses that fool AI into misidentifying a man as actress Milla Jovovich.
  - Example: Stickers on a stop sign can make an AI system fail to recognize the sign, which could be dangerous for self-driving cars.
  - Example: Google researchers used a sticker to make an AI misclassify a banana as a toaster.

- Defending against adversarial attacks involves developing new technologies and modifying neural networks.
  - These defenses may slow down the AI system.
  - Ongoing research aims to improve defenses for critical AI applications.

- Not all AI systems are at risk of attack.
  - Example: An AI system inspecting coffee mugs in a factory might not be a target.
  - However, applications like fraud detection are more susceptible and can feel like a zero-sum game.
    - Example: Anti-fraud teams must continuously react to and defend against attacks.
    - Example: spam versus anti-spam

- The potential damage from adversarial AI attacks should not be over-hyped.
  - Important for some applications, but many AI applications are less likely to be targeted.

- AI can also be used for negative purposes, which will be discussed in the next video.

### Vid 5 Adverse Uses of AI
- AI is powerful and generally benefits people, companies, countries, and society.
- However, there are some negative uses of AI:
  - **Deep Fakes**: 
    - AI can create fake videos of people doing things they never did.
    - Example: BuzzFeed made a video of former US President Barack Obama saying things he never said. 
    - Concern: Deep fakes can harm individuals by making them appear to say or do things they didn't, spreading quickly on social media.
  - **Undermining Democracy and Privacy**: 
    - Some governments use AI to improve citizens' lives, but oppressive regimes may use AI for surveillance.
    - AI can feel oppressive when used for public safety and crime reduction in certain ways.
  - **Fake Comments**: 
    - AI can generate fake comments on products and political matters, more efficiently than humans.
    - Detecting and weeding out fake comments is crucial for maintaining trust in online discourse.
- **Ongoing Battles**:
  - Similar to spam versus anti-spam and fraud versus anti-fraud.
  - Optimism about these battles due to more resources on the anti-spam side.
  - Society functions better if anti-spam and anti-fraud measures are effective.
  - The AI community needs to continue working on defending against adverse uses.
  - Society will benefit if only good uses of AI prevail.
- **Impact on Developing Economies**:
  - AI's impact on developing economies will be discussed in the next video.

---

### Vid 6 AI & Developing Economies

### Technological Disruptions and Opportunities

- Major technological disruptions, like AI, offer chances to remake the world.
- AI impacts both developed and developing economies significantly.
- Ensuring AI-generated wealth benefits all nations is a critical challenge.

### Economic Progression in Developing Economies

- Developing economies follow a predictable progression to gain skills and wealth:
  - Start with low-end agricultural products.
  - Move to low-end textile manufacturing.
  - Transition to low-end components manufacturing.
  - Progress to low-end electronics manufacturing, then higher-end electronics and automotive manufacturing.

### AI's Impact on Economic Ladders

- AI threatens to automate lower-end jobs, removing entry-level opportunities.
- Automation could disrupt the traditional economic ladder for developing nations.

### AI as a Trampoline for Growth

- AI can help developing economies leapfrog to higher technology levels:
  - Example: Developing nations skipped landlines and adopted mobile phones directly.
  - Mobile payments adoption is faster in developing economies due to lack of entrenched credit card systems.
  - Online education is rapidly adopted in developing countries without extensive physical educational infrastructure.

### Global AI Leadership

- The US leads in generative AI, with China, the UK, Canada, India, Korea, Latin America, and others having strong AI communities.
- Opportunities for growth and innovation in AI are still abundant.

### Strategic Focus for Developing Economies

- Developing economies should use AI to enhance their strong vertical industries rather than competing directly with global AI leaders:
  - Example: Countries strong in coffee manufacturing should focus on AI for coffee production.
- Public-private partnerships can accelerate AI development in vertical industries.

### Regulatory and Educational Investments

- Thoughtful government regulations can protect citizens and promote AI adoption in sectors like healthcare, transportation, and finance.
- Investing in AI education is crucial as the field is still maturing, providing opportunities to build a skilled AI workforce.

### Leadership and Technological Advancement

- Leadership in times of technological disruption is crucial.
- Governments and companies should embrace AI to uplift citizens and contribute to global advancements.

### Conclusion and Next Steps

- The video briefly touched on AI's impact on jobs.
- The following video will delve deeper into the relationship between AI and employment.

---
### Vid 7 AI and Jobs

### Automation's Historical Impact
- **Pre-AI Era**: Automation had already significantly impacted many jobs.
- **Modern AI**: The range of tasks that can be automated has increased, further affecting jobs.

### Job Displacement and Creation Estimates
- **McKinsey Global Institute**:
  - Estimated 400 to 800 million jobs displaced by AI by 2030.
  - Potential for an even larger number of new jobs created by AI. 555-890 mil.
- **Goldman Sachs**:
  - Estimated 300 million jobs displaced by AI by 2033.
- **General Consensus**: Significant impact on jobs with a potential net positive in job creation.

### Future Job Market and Reskilling
- **Reskilling Needs**: Significant need for worker reskilling in certain sectors.
- **New Job Titles**:
  - Examples include drone traffic optimizer, 3D printed clothing designer, and custom DNA-based drug designer.

### Estimating Job Displacement
- **Methodology**:
  - Analyzing the tasks that make up a job.
  - Estimating the automatable tasks for each job (e.g., tasks of a radiologist or taxi driver).
  - Higher risk of displacement for jobs with a majority of automatable tasks.

### Jobs Most and Least Likely to be Displaced
- **McKinsey's Study**: Impact of AI on various jobs, including generative AI tools.

<img src="/src/assets/ai_impact_2.png"></img>

- **Top 10 Jobs with Most Potential for Automation by 2033**:
  - Jobs span occupation groups like office work, mechanical installation and repair, business and legal, professional work, and customer service and sales.
  - Percentage of work tasks that may be automated (e.g., 87% or 82%).

Overall, while AI is set to displace many jobs, it also holds the promise of creating new opportunities, necessitating adaptation and reskilling in the workforce.

### Impact of Generative AI on Job Automation
- Generative AI significantly impacts job automation capabilities.
- These tools generate human-like text, write empathetic emails, and interact with humans.
- New categories of jobs are now exposed to AI automation, particularly in writing and communications.
- Occupations like office support and legal work see increased automation potential.
- These top 10 occupations employ over 70% of the global workforce.

### Solutions for Navigating AI's Impact on Jobs

#### Conditional Basic Income
- Conditional basic income: A safety net with incentives for continuous learning and development.
- More effective than universal basic income, as it encourages reentry into the workforce.
- Benefits include personal development, family contribution, societal benefits, and tax base support.

#### Lifelong Learning Society
- Lifelong learning is essential in a rapidly changing world.
- The traditional education model is outdated; continuous learning is necessary.
- Governments, companies, and individuals need to embrace lifelong learning.
- Positions individuals better for new job opportunities created by technological advancements.
- Continuous education should extend beyond college throughout one's life.

#### Political Solutions
- Various political solutions are being explored.
- These include incentives for new job creation and fair treatment legislation.
- Society needs to develop effective political solutions to manage AI's job impacts.

### Career Advice in the Age of AI
- AI's impact on specific professions, like radiology, prompts career reconsideration.
- Learning AI from scratch is possible and beneficial for career transitions.
- Combining existing knowledge with AI expertise can create unique and valuable roles.
- Example: A radiologist combining radiology with AI knowledge can excel in AI-driven radiology.

### Conclusion
- The video aims to help navigate AI's impact on jobs.
- Encourages exploration of AI integration with existing expertise for career advancement.


### Vid 8 Conclusion

### Course Summary

#### Week 1: Introduction to AI
- **Understanding AI Technology**:
  - Definition of AI and Machine Learning.
  - Explanation of Supervised Learning (learning inputs, outputs, or A to B mappings).
  - Overview of Data Science and the role of data in AI technologies.
- **AI Capabilities**:
  - Examples of what AI can and cannot do.

#### Week 2: Building AI Projects
- **AI Project Workflow**:
  - Steps: Collecting data, building a system, and deploying it.
- **Data Science Project Workflow**:
  - Technical and business diligence to ensure project feasibility and value.

#### Week 3: AI in Business Context
- **Complex AI Products**:
  - Examples: Smart speakers, self-driving cars.
- **AI Team Roles and Responsibilities**:
  - Insights into large AI teams.
- **AI Transformation Playbook**:
  - Five-step guide to help a company become a great AI company.
- **Brainstorming AI Projects**:
  - How to use AI in your company or organization.

#### Week 4: AI and Society
- **AI Limitations**:
  - Beyond technical limitations.
- **Global Impact of AI**:
  - Effects on developing economies and jobs worldwide.

### Continued Learning and Resources
- **Further Education**:
  - Additional online courses (Coursera, deeplearning.ai), books, blogs, and discussions with friends.
- **Coding and Implementation**:
  - Easier than ever to learn coding and AI technology implementation through available resources.
- **Staying Informed**:
  - Sign up for the deeplearning.ai mailing list for useful AI information updates.

Congratulations on completing the course and continue your journey in AI!

---
summarize the following text with bullet points and headings where appropriate. Keep the summary in the same order as the original content and retain all of the examples used:


Congratulations on coming to the last video of this course. AI is a superpower and understanding it allows you to do things that very few people on the planet can. Let's summarize what you've seen in this course. In the first week, you learned about AI technology, what is AI and what is machine learning? What's supervised learning, that is learning inputs, outputs, or A to B mappings. As well as what is data science, and how data feeds into all of these technologies? Importantly, you also saw examples of what AI can and cannot do. In the second week, you learned what it feels like to build an AI project. You saw the workflow of machine learning projects, of collecting data, building a system, and deploying it, as well as the workflow of data science projects. And you also learned about carrying out technical diligence to make sure a project is feasible, together with business diligence to make sure that the project is valuable before you commit to taking on a specific AI project. In the third week, you learned how such AI projects could fit in the context of your company. You saw examples of complex AI products, such as a smart speaker, a self-driving car, the roles and responsibilities of large AI teams. And you also saw the AI transformation playbook, the five-step playbook for helping a company become a great AI company. I hope these materials throughout these first three weeks can help you brainstorm AI projects or think about how you might want to use AI in your company or in your organization. In this week, week four, you learned about AI and society. You saw some of the limitations of AI beyond just technical limitations, and also learned about how AI is affecting developing economies and jobs worldwide. You've learned a lot in these four weeks, but AI is a complex topic. So I hope you will keep on learning, whether through additional online courses, through Coursera or deeplearning.ai, or books, or blogs, or just by talking to friends. If you ever want to try your hand at building AI technology, it is now easier than ever to learn to code and learn how to implement AI technology through these resources. If you'd like to keep on receiving information about AI, you can also sign up for the deeplearning.ai mailing list, by going to the deeplearning.ai website and signing up there. I'll occasionally send you useful information about AI through that mailing list.
