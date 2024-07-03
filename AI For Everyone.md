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
- In the last video:
  - Learned about executing pilot projects, building an in-house AI team, and providing broad AI training.

- If you want your business to have long-term value using AI:
  - Discuss AI strategy.
  - Importance of internal and external communications related to AI.

- Recap of the five-step AI transformation playbook:
  - Focus on the final two steps in this video.

- Step four: Develop an AI strategy:
  - Leverage AI for industry-specific advantages.
  - Strategy development as step four, not step one, based on feedback from CEOs.
  - Importance of practical experience with AI before forming a strategy.
  - Example: CEOs copying headlines leading to ineffective strategies.
  - Recommend starting with pilot projects, team building, and training.
  - Formulate strategy after understanding AI's applications in your business.
  - Align strategy with the Virtuous Cycle of AI:
    - Example: Web search engines use AI to create defensible businesses through data collection and user acquisition.
    - Smaller teams can leverage this cycle in new verticals.
    - Example: Blue River's agricultural technology using AI for weed control, leading to a defensible data asset.

- Specialized AI strategy for your industry:
  - Competing with large tech companies on AI is not necessary.
  - Focus on AI specialized for your industry applications.
  - Example: Building a unified data warehouse for effective AI implementation.
  - Importance of data strategy and strategic data acquisition.

- AI can enhance traditional strategy frameworks:
  - Michael Porter's low cost and high value strategies.
  - Use AI to reduce costs or increase product value.

- Build AI businesses that make people better off:
  - AI as a powerful tool to build great companies.
  - Ensure AI benefits humanity.

- Step five: Develop internal and external communications:
  - Communicate AI changes to relevant stakeholders.
  - Importance of investor relations and government relations in regulated industries.
  - Consumer and user education if products change.
  - Showcase successes for talent recruitment.
  - Address internal concerns about AI.

- Conclusion:
  - Vision for helping companies become good at AI.
  - Avoid common pitfalls in AI implementation, discussed in the next video.

---

summarize the following text with bullet points, keep the summary in the same order as the original content, retain all of the examples used:

In the last video, you learned how to execute pilot projects to gain momentum, build an in house AI team and provide broad AI training. But if you want your business to not just gain momentum in the short term, using AI, but in the long term be a very valuable and maybe even defensible business, what can you do? Let's talk about AI strategy, as well as, perhaps important for some companies internal and external communications relative to AI. To recap, this is the five step AI transformation playbook, and in this video we'll dive more deeply into these final two steps. Step four of the AI transformation playbook is to develop an AI strategy, which I hope for you may mean to leverage AI to create an advantage specific to your industry sector. One unusual part of this playbook is that developing the AI strategy is step four, not step one. When I shared this with many CEOs, consistent requests or piece of feedback I got was, can you please put the strategy as step one because I want to figure out what is my company strategy, then want to find the resources and then I'll execute on the strategy. But I found that companies that try to define the strategy as step one before getting your feet wet, before trying out AI and knowing what it feels like to build an AI project. Companies like that tend to end up with sometimes very academic strategies that are sometimes not true to life. So for example, I've seen some CEOs copy and paste newspaper headlines into their strategy. We read that data is important, so you say, my strategy is to focus on collecting a lot of data. But for your company, that data may or may not be valuable, it may or may not be a good strategy for your company. So I tend to recommend to companies to start the other steps first. Execute the pilot projects, start building a little bit of a team, start providing some training, so that only after you understand AI and understand how it may apply to your business. That you then formulate your strategy, and I think this will work much better for your company than if you try to formulate an AI strategy before your company. Including specifically the executive team, has some slightly deeper understanding of what AI can and cannot do for your industry sector. In addition, you might consider designing a strategy that is aligned with the Virtuous Cycle of AI. Let me illustrate that with an example from web search. One of the reasons that web search is a very defensible business, meaning it's very difficult for new entrants to compete with the incumbents with the existing large web search engines, is this. If a company has a better product, maybe a slightly better product, then that web search engine can acquire more users. And having more users means that you collect more data, because you get to observe what different users click on when they search for different terms. And that data can be fed into an AI engine to produce an even better product. So this means that, the company with a somewhat better product ends up with even more users, ends up with even more data, and does an even better product with this link being created by modern AI technology. And it makes it very difficult for a new entrant to break into this self reinforcing positive feedback loop called the Virtuous Cycle of AI. Fortunately though, this Virtuous Cycle of AI can be used by smaller teams entering new verticals as well. So I think today it's very difficult to build a new web search engine to compete with Google, or Baidu, or Bing, or Yandex. But if you are entering a new vertical, a new application area where there isn't an entrenched incumbent. Then you might be able to develop a strategy that lets you be the one to take advantage of this virtuous cycle. Let me illustrate with an example. There is a company called Blue River that was acquired by John Deere for over 300 million US dollars. And Blue River makes agricultural technology using AI. So what they did was built these machines that would be towed behind a tractor in a big agricultural field. And this machine would take pictures of crops and figure out which is a crop and which is a weed, and use precision AI to kill off just the weeds, but not the crop. So I knew some of the founders of Blue River while they were Stanford students taking my class. And so to get the project started, they actually just used strappiness and sweat. They used their personal cameras and went out to a bunch of farms and took a lot of pictures of crops in these agricultural fields. So they started to collect pictures of heads of cabbage and weeds around the cabbage. Once they had enough data, start off with a small data set, they could train a basic product. And the first product, frankly, wasn't that great, it was trained on a small data set. But it kind of worked well enough to start to convince some users to start to use their product. To tow this machine behind a tractor in order to start cooling weeds for the farmers. And once this thing was running around the farms, through the process of taking pictures of heads of cabbage and killing off weeds, they naturally acquired more and more data. And over the next few years, what they did was, they were able to enter this positive feedback loop where having more data allows you to have a better product, have a better product allows you to convince more farmers to use it, and having farmers use it, allows you to collect more data. And over several years entering a virtuous cycle like this, can allow you to collect a huge data asset that then makes your business quite defensible. And in fact, at the time of acquisition, I'm pretty sure that they had a much bigger data asset of pictures of heads of cabbage lying in a field than even the large tech companies had. And this actually makes the business relatively defensible from even the large tech companies that have a lot of web search data but do not have nearly as many pictures as this company does of heads of cabbage lying in the agriculture fields. One more piece of advice, a lot of people think that some of the large tech companies are great at AI, and I think that's true. Some of the large tech companies are very good at AI. But this doesn't mean you need to or should try to compete with these large tech companies on AI in general. Because a lot of AI needs to be specialized or verticalized for your industry sector. And so for most companies, it'll be in your best interest to build AI specialized for your industry, and to do great work on AI for your application areas. Rather than try to compete or feel like you need to compete left and right with the large tech companies on AI over the place, which just isn't true for most companies. Other elements of an AI strategy, we are going to live in an AI powered world, and the right strategy can help your company navigate these changes much more effectively. You should also consider creating a data strategy. Leading AI companies are very good at strategic data acquisition. For example, some of the large consumer facing AI companies will launch services like a free email service, or a free photo sharing service, or many other free services that do not monetize. But allows them to collect data in all sorts of ways that lets them learn more about you, so they can serve you more relevant ads and thereby monetize the data in a way that is quite different than direct monetization of that product. The way you acquire data is very different depending on your industry vertical. But I have been involved in what feels like these multi-year chess games, where other corporate competitors and I play multi-year games to see who can acquire the most strategic data assets. You might also consider building a unified data warehouse. If you have 50 different data warehouses under the control of 50 different vice presidents. Then it's almost impossible for an AI engineer or for a piece of AI software to pull together all of this data in order to connect the dots. For example, if the data warehouse for manufacturing is in a totally different place than the data warehouse for customer complaints. Then how can an AI engineer pull together this data to figure out what are the things that might happen in manufacturing that causes you to ship a faulty cell phone, that causes the customer to complain two months later. So a lot of leading AI companies have put a lot of upfront effort into pulling the data into a single data warehouse. Because this increases the odds that an engineer or a piece of software can connect the dots and spot the patterns between how an elevated temperature in manufacturing today, may result in a faulty device that leads to a customer complaint two months in the future. Thus letting you go back to improve your manufacturing processes, there are many examples of this in multiple industries. You can also use AI to create network effects and platform advantages. In industries with winner take all dynamics, AI can be a huge accelerator. For example, take the right sharing or the right hailing business. Today companies like Uber and Lyfts and Didi and Grab. Seem like they have relatively defensible businesses because there are platforms that connect drivers with passengers. And is quite difficult for a new entrant to accumulate both a large rider audience and a large passenger audience at the same time. Social media platforms like Twitter and Facebook are also very defensible because they are very strong network effects. Where having a lot of people on one platform makes that platform more attractive to other people. So it's very difficult for a new entrant to break in. If you are working in a business with these types of winner take all dynamics or winner take most dynamics. Then if AI can be used to help you with growing faster, for example, with accelerating user acquisition. Then that can perhaps translate into a much bigger chance that your company will be the one to succeed in this business vertical. Strategy is very company and industry and situation specific, so it's hard to give strategy advice that's completely general to every single company. But I hope that these principles give you a framework for thinking about what might be some key elements of an AI strategy for your company. Now AI can also fit into more traditional strategy frameworks. For example, Michael Porter many years ago had written about low cost and high value strategies. If your company has a low cost strategy, then perhaps AI can be used to reduce costs for your business. Or if your company has a high value strategy to deliver really, really valuable products with a higher cost. Then you might use AI to focus on increasing the value of your products. And so, AI capabilities can also help augment existing elements of a broader corporate strategy. Lastly, as you're building these valuable and defensible businesses, I hope that you will also build only businesses that make people better off. AI is a superpower, this is a very powerful thing that you can do to build a great AI company. And so I hope that whatever you do, you do this only in ways that make humanity better off. The final step of the AI transformation playbook is to develop internal and external communications. AI can change a company and its products, and it's important to communicate appropriately with the relevant stakeholders about this. For example, this may include investor relations to make sure that your investors can value your company appropriately as an AI company. Investor relations may also include government relations. For example, AI is entering healthcare, which is a highly regulated industry, because government has a legitimate need to protect patients. And so for AI to affect these highly regulated industries, I think it's important for companies to communicate with governments and to work collaboratively with them in public-private partnerships. To make sure that, AI solutions bring people the benefits it can, while also making sure that governments can protect consumers and protect patients. So this will be true for healthcare, it'll be true for self driving cars, it will be true for finance and many other AI industry verticals. If your products change, then consumer or user education will be important. AI talent is very scarce in today's world, and so if you are able to showcase some of your initial successes, that could really help with talent and recruiting. Finally, internal communications is also important. If you are making a shift in your company, then many people internally may have worries, some legitimate and some less rational. About AI and internal communications, to reassure people where appropriate can only be helpful. With these five steps, I hope it gives you a vision for how you might be able to help a company become good at AI. I hope you enjoyed these two videos on the AI transformation playbook. I've seen companies become much more valuable and much more effective by embracing and become good at AI. And I hope these ideas may help you take a first step toward helping your company good at AI. Having said that, I've also seen many common pitfalls that companies run into when trying to implement AI across the enterprise. Let's take a look at some of these common pitfalls in the next video so that hopefully you can avoid them. Let's go on to the next video.
