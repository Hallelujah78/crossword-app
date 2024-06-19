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
    - in traditional AI, as you feed more data, performance increases quickly initially but soon
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
- **Data Quality Issues**: Data can have errors or missing values, and it’s cruc ial to clean it.
- garbage in, garbage out
- examples of data problems
    - take the house size and price data from before, but for some rows the number of bedrooms is unknown and in some cases the price is unknown, and the size in sq feet might be unknown
- **Types of Data**:
  - **Unstructured Data**: Includes images, audio, and text, needing specific AI techniques.
  - **Structured Data**: Lives in spreadsheets and requires different AI techniques.
- **Current AI Applications**: generative AI today often generates unstructured data (text, images, audio).
- supervised learning works well with unstructured data and unstructured data
- **Learning Outcomes**:
  - **Understanding Data**: Identifying proper use of data and avoiding overinvestment in data infrastructure.
  - **Data Cleanup**: Handling inaccuracies and missing values in data.
  - **Next Steps**: The next video will clarify AI-related terminology.

### Vid 4: The Terminology of AI
- **AI Terminology Overview**: Understanding key terms in AI helps in discussing and applying them in business.
- **Machine Learning (ML)**:
  - **Definition**: Field where computers learn from data without explicit programming (Arthur Samuel's definition).
  - **Example**: Housing dataset to predict prices (input A: house features; output B: price).
  - **Use**: Creates software for continuous use, e.g., online ad systems predicting clicks.
- **Data Science**:
  - **Definition**: Extracts knowledge and insights from data.
  - **Example**: Analyzing housing data to determine if more bedrooms increase value or if renovations justify a higher price.
  - **Output**: Produces insights, often in presentations for business decisions.
  - **Example in Advertising**: Analyzing data to decide where to focus sales efforts based on industry ad spending.
- **Fuzzy Boundaries**: Terms like ML and data science are not consistently used, but ML often results in operational software, while data science provides actionable insights.
- **Deep Learning and Neural Networks**:
  - **Neural Network**: A powerful ML technique for input (A) to output (B) mappings, originally inspired by the brain.
  - **Deep Learning**: Modern term for neural networks, emphasizing extensive, layered learning.
  - **Example**: Predicting house prices using inputs like size and renovation status.
- **Relation to the Brain**: Neural networks are loosely inspired by the brain but function very differently.
- **Other AI Terms**: Includes generative AI, unsupervised learning, reinforcement learning, graphical models, planning, and knowledge graphs.
- **Hierarchy of AI Concepts**:
  - **AI**: Broad set of tools for intelligent behavior.
  - **Machine Learning**: Largest subset of AI tools, includes deep learning.
  - **Deep Learning/Neural Networks**: Key subset of ML for supervised learning and more.
  - **Data Science**: Uses many AI/ML tools but also includes unique methods for business insights.
- **Application in Business**: Understanding these terms helps in thinking about their application in a company.
- **Future Videos**: Will cover what it means for a company to excel at AI.

