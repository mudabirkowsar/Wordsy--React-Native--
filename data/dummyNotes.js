const dummyNotes = [
    {
        id: "1",
        title: "Shopping List",
        description:
            "This shopping list is a comprehensive reminder of everything I need to purchase this week. I must buy milk, bread, eggs, butter, and fresh fruits like apples, bananas, and oranges for daily consumption. Additionally, I need to pick up some vegetables such as spinach, carrots, potatoes, onions, and tomatoes to prepare meals for the next few days. Snacks like biscuits, chips, and chocolates should also be on the list for evening tea and family time. I want to ensure I get some cereals, oats, and coffee as well for my morning routine. Don’t forget spices like turmeric, cumin, coriander powder, and garam masala to keep my cooking flavorful. I also need to check if we are low on cooking oil, rice, and lentils. Finally, I will purchase cleaning supplies like dish soap, detergent, and sanitizer. This should cover most essentials, and I’ll update if I remember more before heading to the store.",
        pinned: false,
    },
    {
        id: "2",
        title: "Work Tasks",
        description:
            "Today’s work tasks are critical and need to be completed with focus and discipline. First, I must finish the user interface design for the new mobile app we are developing. The design should be minimal, user-friendly, and aligned with our brand’s visual guidelines. After that, I need to prepare the monthly performance report, including details about project progress, resource allocation, and productivity metrics. This report will be shared with management, so it must be accurate and clearly formatted. I also have to schedule a team meeting to discuss upcoming deliverables and deadlines. During the meeting, I will address any blockers, assign responsibilities, and encourage collaboration. In addition, I must review pull requests submitted by team members to ensure code quality and maintain project standards. Lastly, I plan to write an email to our client summarizing the week’s progress and the next milestones. If time permits, I will also explore automation tools.",
        pinned: false,
    },
    {
        id: "3",
        title: "Ideas",
        description:
            "One of the most exciting ideas I’ve been considering lately is creating an app for tracking daily habits with AI integration. The app could help users build consistency in areas such as fitness, learning, meditation, or even managing finances. Users would log their habits, and the app would use AI to provide personalized suggestions, encouragement, and feedback. For example, if a user sets a goal to exercise regularly, the AI could analyze their patterns and recommend optimal times for workouts. It could also integrate with wearables to track real-time progress. Another potential feature is gamification—rewards, badges, and progress streaks to keep users motivated. Social features could allow people to share milestones with friends and form accountability groups. Over time, the app could use machine learning to adapt to user behavior and refine recommendations. If developed properly, this idea has the potential to improve productivity and lifestyle for thousands of users.",
        pinned: false,
    },
    {
        id: "4",
        title: "Travel Plan",
        description:
            "I am planning a trip to Goa in December, and I want it to be memorable and relaxing. My primary goal is to explore the beautiful beaches, such as Baga, Calangute, Anjuna, and Palolem, each offering a unique experience. Apart from beaches, I want to visit Aguada Fort, Chapora Fort, and Basilica of Bom Jesus to explore the history and culture. Nightlife is another highlight, and I plan to check out some famous clubs and beach shacks with live music. Food is also a priority, so I will try authentic Goan seafood, especially prawn curry, fish thali, and bebinca for dessert. Adventure activities like parasailing, scuba diving, and jet skiing are on my to-do list as well. To make the trip more enjoyable, I will book a comfortable stay near the beach, so I can enjoy both sunrise and sunset views. Overall, this travel plan will help me recharge and create lasting memories.",
        pinned: false,
    },
    {
        id: "5",
        title: "Book Summary",
        description:
            "Recently, I finished reading an inspiring book that emphasizes the importance of discipline and consistent effort in achieving success. The author shares personal stories and real-world examples to highlight how small, repeated actions compound over time to bring meaningful results. One of the key lessons I learned is that motivation is fleeting, but discipline sustains progress. For example, instead of waiting for the perfect moment to act, one must develop routines and stick to them even when it feels difficult. Another takeaway is the significance of focus—learning to say no to distractions and prioritizing what truly matters. The book also talks about resilience, urging readers to embrace failure as a stepping stone to growth rather than a setback. I found the writing style engaging, filled with practical advice rather than just theories. I plan to implement some strategies, such as creating a structured daily schedule, tracking my habits, and reviewing progress weekly.",
        pinned: false,
    },
    {
        id: "6",
        title: "Fitness Goals",
        description:
            "My fitness goals for the next three months are designed to improve both strength and endurance. I want to follow a structured workout plan that balances cardio, strength training, and flexibility exercises. My cardio routine will include jogging three times a week and cycling on weekends. For strength training, I plan to alternate between upper body, lower body, and core workouts at least four days a week. Flexibility will be improved through yoga sessions twice a week. Nutrition will also play a critical role, so I aim to maintain a balanced diet rich in protein, complex carbs, healthy fats, and fiber. I will avoid processed foods, reduce sugar intake, and stay hydrated throughout the day. To track my progress, I’ll use a fitness app and wearable device to monitor calories burned, heart rate, and sleep quality. My ultimate goal is not only to lose some fat but also to build sustainable healthy habits.",
        pinned: false,
    },
    {
        id: "7",
        title: "Learning React Native",
        description:
            "I have set a goal to learn React Native thoroughly over the next few weeks. My learning plan begins with understanding the fundamentals of React, including components, props, and state management. Once I’m comfortable with those, I will move on to React Native-specific concepts like using built-in components such as View, Text, ScrollView, FlatList, and Modal. I also want to understand navigation in depth using React Navigation, including stack, tab, and drawer navigators. Handling API calls, managing asynchronous code with async/await, and integrating Redux for state management are also on my list. To make my learning practical, I’ll build small projects like a todo app, notes app, and a weather app. Over time, I’ll also explore advanced topics like animations, performance optimization, and testing. The ultimate goal is to gain enough confidence to build and publish a fully functional mobile app on both iOS and Android platforms.",
        pinned: false,
    },
    {
        id: "8",
        title: "Daily Journal",
        description:
            "Today has been quite eventful, and I want to note down everything that happened. I started my day early with a refreshing jog, which instantly boosted my energy levels. After breakfast, I focused on completing some pending work tasks, which gave me a sense of accomplishment. Later in the afternoon, I spent quality time reading a book I’ve been meaning to finish for weeks. The story was engaging and kept me hooked for hours. In the evening, I caught up with an old friend over a phone call, and we shared many memories and laughter. Before dinner, I practiced meditation for 20 minutes, which helped me calm my mind and reflect on the day. Overall, I feel grateful for the productivity, connections, and peace I experienced. Writing this down reminds me to cherish simple moments and strive for balance between work, learning, and personal relationships in everyday life.",
        pinned: false,
    },
]
export default dummyNotes;