import { Box } from '@mui/material';
import React from 'react';
import IArticle from '../../../types/IArticle';
import Article from '../Article';

const ArticlesDisplay = () => {
  const articles: IArticle[] = [
    {
      date: 20211124,
      url: 'www.4399.com',
      title: '分析：加强针、儿童接种、戴口罩——如何防止澳洲出现新一波疫情',
      title_en:
        'Analysis: Strengthening needles, child vaccination, wearing masks - how to prevent Australia from appearing new wave of epidemic',
      content: '欧洲目前正面临第四波新冠疫情。在关注那里疫情发展的同时，我们也要问问自己，澳大利亚是否也会面对同样的命运几个因素将决定我们的命运：疫苗接种率、第三剂加强针高接种率、儿童疫苗接种率，制定全面的通风策略，以及除了疫苗措施以外的戴口罩、新冠检测与接触者追踪措施。新州的专家咨询小组OzSAGE所做的模型显示，尽管目前疫苗接种率很高，但从12月中旬开始，新冠病例可能会增加，预计在2022年2月达到高峰。OzSAGE还警告说，如果不能保持对亲密接触者的追踪，以及5至11岁的儿童仍没能接种疫苗，医院可能会再次不堪重负。但如果我们给小学适龄儿童（5-11岁）接种疫苗，并保持较高的新冠检测与追踪，情况会好很多。\n \n 加强针至关重要 在欧洲，没有实施完善的第三剂加强针政策可能是一些国家确诊病例激增的部分原因。 例如，德国在10月份建议对70岁以上的人和某些高风险人群进行加强针注射。11月18日，为了应对疫情大规模反弹，德国政府才迟迟将这一建议改为针对18岁及以上的人群。 欧洲各地新冠确诊病例的激增可能要归咎于不完善的第三剂加强针政策。 欧洲各地新冠确诊病例的激增可能要归咎于不完善的第三剂加强针政策。(AP: Jean-Francois Badias) 法国也是如此。该国在针对成年人提供加强针方面也进展缓慢，且限制颇多。从今年12月起，50岁以上的人才有资格接种第三剂加强针。同样，爱尔兰在10月底才批准为60岁及以上的人提供加强针。 事实已经很清楚了，加强针是必要的。 奥地利接种率只有64%，丹麦接种率76%，这样的接种率是不够的，在这种情况下，加强针接种计划还推进缓慢且限制多多，再加上解除了例如戴口罩这样的规定，导致许多欧洲国家疫情反复。 奥地利是疫苗接种率最低的欧洲国家之一，也是新冠确诊率最高的欧洲国家之一，这也促使该国成为第一个强制接种新冠疫苗的欧洲国家。 第四波疫情大部分是由儿童传播的。欧盟在批准幼童接种疫苗方面动作缓慢，致使奥地利在欧盟还没批准的情况下，为孩童接种疫苗。',
      content_en: 'The fourth wave of COVID-19 is currently circulating in Europe. While paying attention to the development of the epidemic, we must also face whether Australia will have the same fate. Several people will determine our fate: morbidity, third-party inoculation rate, child vaccination rate, and formulating comprehensive ventilation strategies. And in addition to preventive measures, wearing masks, new crown testing and contact tracing measures. OzSAGE also said that if the tracing of the warning contacts cannot be maintained, and there are still children between the ages of 5 and 11 who have not been vaccinated, the hospital may be noisy again. But if we vaccinate elementary school-age children (5-11 years old) and maintain the detection and tracking of COVID-19 for the elderly, the situation will be much better. For example, Germany has strengthened policies for certain high risks over 70 years old in 10 years. November 18. In order to recover from the newly diagnosed disease, the German government will not target the causes of 18 years of age and above. (AP: Jean-Francois Badias) France is the same. The country has also made slow progress in supporting the strengthening of needles, with many restrictions. From December next year, talents are eligible, and talents over 50 need to be strengthened. Similarly, Ireland only approved the provision of booster injections for people 60 years and older at the end of October. It is already clear that strengthening needles are necessary. . The activation rate is only 64%, and the driving rate is 76%. This is the case in this case. In this case, the needle strengthening plan is slow and restrictive. In addition, it has already begun, such as wearing a mask. , The European countries that caused the outbreak of the epidemic in European countries are the countries of the new crown pneumonia this time. The epidemic is spread by children. The EU has been slow to approve the birthdays of young children. In the case that people in the house have already approved, the children are on holidays.',
      source: 'CCTV',
    },
    {
      date: 20201124,
      url: 'http://www.4399.com',
      title: '欢迎光dfasdf临',
      title_en: 'welcomfsdfe this article',
      content: '阿萨德噶是搭嘎师傅大哥',
      content_en: 'asdf;ajslkfjwierfj asdf ',
      source: 'CCAV',
    },
    {
      date: 20211124,
      url: 'www.4399.com',
      title: '欢迎sdf光临',
      title_en:
        'Analysis: Sfftrengthening needles, child vaccination, wearing masks - how to prevent Australia from appearing new wave of epidemic',
      content: '分析：加强针、儿童接种、戴口罩——如何防止澳洲出现新一波疫情',
      content_en: 'asdf;ajslkfjwierfj asdf ',
      source: 'CCTV',
    },
    {
      date: 20201124,
      url: 'http://www.4399.com',
      title: '欢迎光dfafsdafsdf临',
      title_en: 'welcomasdffsdfe this article',
      content: '阿萨德噶是搭嘎师傅大哥',
      content_en: 'asdf;ajslkfjwierfj asdf ',
      source: 'CCAV',
    },
  ];
  return (
    <>
      {articles.map((article) => (
        <Box key={article.title} sx={{ m: 2 }}>
          <Article article={article} />
        </Box>
      ))}
    </>
  );
};

export default ArticlesDisplay;
