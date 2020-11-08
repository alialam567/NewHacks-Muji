
fp = fopen('humidity.txt', 'r');
if fp == -1
  error('Author:Function:OpenFile', 'Cannot open file: %s', 'Humidity.txt');
end

formatspec = '%f';
x = fscanf(fp, formatspec);
plot(x)
title("Humidity over Time");
ylabel("Temperature"); xlabel("Hours");
fclose(fp);
ylim([0 100]);

exportgraphics(gcf,'humidity.png','Resolution',300)

fp2 = fopen('MeanSD.txt', 'w');
if fp2 == -1
  error('Author:Function:OpenFile', 'Cannot open file: %s', 'MeanSD.txt');
end

y = mean(x);

z = std(x);

if (max(x) > y + z) 
    [maxX, I] = max(x);
    fprintf(fp2, 'A Humidity high outlier of %2.2f was detected at the %dth hour\n', maxX , I); 
end

if (min(x) < y -z) 
    [minX, I] = min(x);
    fprintf(fp2, 'A Humidity low outlier of %2.2f was detected at the %dth hour\n', minX , I); 
end
    

fprintf(fp2, 'The average humidity over the time period was %2.2f with a standard deviation of %2.2f',y ,z ); 
fclose(fp2);
